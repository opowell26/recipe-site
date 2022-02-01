import { Cheerio, Element, load } from 'cheerio'
import fetch from 'node-fetch'
import { performance } from 'perf_hooks'
import { HowToSection, INutrition, IRecipe } from '../models/recipe'
import { decodeHTML } from 'entities'

type JSONldInstructions = {
  name?: string
  text?: string
  itemListElement: [{ text: string }]
}

type JSONldNutrition = {
  calories: string
  carbohydrateContent: string
  cholesterolContent: string
  fatContent: string
  fiberContent: string
  proteinContent: string
  saturatedFatContent: string
  servingSize: string
  sodiumContent: string
  sugarContent: string
  transFatContent: string
  unsaturatedFatContent: string
}

class Recipe implements IRecipe {
  name: string
  description?: string
  ingredients: [string]
  instructions: (HowToSection | string)[]
  nutrition?: unknown
  url?: string
  image?: string
  video?: string
  recipeYield?: string
  prepTime?: string
  cookTime?: string
  totalTime?: string
  notes?: string

  constructor({
    name,
    description,
    image,
    ingredients,
    instructions,
    nutrition,
    recipeYield,
    url,
    video,
    prepTime,
    cookTime,
    totalTime,
    notes,
  }: Recipe) {
    this.name = name
    this.description = description
    this.image = image
    this.ingredients = ingredients
    this.instructions = instructions
    this.nutrition = nutrition
    this.recipeYield = recipeYield
    this.url = url
    this.video = video
    this.prepTime = prepTime
    this.cookTime = cookTime
    this.totalTime = totalTime
    this.notes = notes
  }

  private static formatInstructionSteps = (steps: [{ text: string }]): string[] => {
    return steps.reduce((newSteps: string[], step: { text: string }) => {
      return newSteps.concat(decodeHTML(step.text))
    }, [])
  }

  private static formatInstructions = (instructions: JSONldInstructions[]) => {
    const formattedInstructions: (HowToSection | string)[] = []
    instructions.forEach((step) => {
      // or if has property name
      if (step['@type'] === 'HowToSection') {
        const formattedSection: HowToSection = {
          name: step.name,
          steps: this.formatInstructionSteps(step.itemListElement),
        }
        formattedInstructions.push(formattedSection)
      } else {
        formattedInstructions.push(decodeHTML(step.text))
      }
    })
    return formattedInstructions
  }

  private static formatNutrition = (nutrition: Partial<JSONldNutrition>): Partial<INutrition> => {
    return {
      calories: nutrition?.calories,
      carbohydrates: nutrition?.carbohydrateContent,
      cholesterol: nutrition?.cholesterolContent,
      fat: nutrition?.fatContent,
      fiber: nutrition?.fiberContent,
      protein: nutrition?.proteinContent,
      saturatedFat: nutrition?.saturatedFatContent,
      servingSize: nutrition?.servingSize,
      sodium: nutrition?.sodiumContent,
      sugar: nutrition?.sugarContent,
      transFat: nutrition?.transFatContent,
      unsaturatedFat: nutrition?.unsaturatedFatContent,
    }
  }

  static fromJSON = (json: unknown) => {
    let recipe: IRecipe
    // json+ld appears to have 3? general formats
    //      1. Array of types (including recipe)
    //      2. Graph property with array of types (including recipe)
    //      3. Object with recipe top level
    // TODO: error if certain recipe properties aren't found
    // TODO: refactor to use a function to get the array
    const jsonArray = Array.isArray(json) ? json : json['@graph'] || [json]
    try {
      jsonArray.forEach(
        (
          elem: IRecipe & {
            recipeIngredient: [string]
            recipeInstructions: [JSONldInstructions]
          }
        ) => {
          if (elem['@type'] == 'Recipe') {
            recipe = {
              name: elem?.name,
              description: elem?.description,
              ingredients: elem.recipeIngredient,
              instructions: this.formatInstructions(elem.recipeInstructions),
              recipeYield: elem.recipeYield,
              prepTime: elem.prepTime,
              cookTime: elem.cookTime,
              totalTime: elem.totalTime,
              nutrition: this.formatNutrition(elem.nutrition),
            }
          }
        }
      )
      return new Recipe(recipe)
    } catch (error) {
      console.error(error)
      throw 'There was a problem parsing the JSON+ld object'
    }
  }
}

const fetchDOMmodel = async (url: string) => {
  try {
    const response = await fetch(url)
    const html = await response.text()
    return load(html)
  } catch (error) {
    console.error(error)
  }
}

export const getJsonLDfromURL = async (url: string) => {
  const $ = await fetchDOMmodel(url)
  const start = performance.now()
  let jsonld: Cheerio<Element>
  try {
    jsonld = $('script[type="application/ld+json"]')
    if (jsonld.length > 1) {
      // find the one with recipe
      jsonld.each((_, elm) => {
        const html = $(elm).html()
        if (html.includes('"@type":"Recipe"')) {
          jsonld = JSON.parse(html)
          // short circuit if found
          return false
        }
      })
    } else {
      jsonld = JSON.parse(jsonld.html())
    }
  } catch (error) {
    throw `No ld+json on this page ${url}`
  }
  const recipe = Recipe.fromJSON(jsonld)
  const end = performance.now()
  console.log(`time for brute force: ${start - end}`)
  return recipe
}
