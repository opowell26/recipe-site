import { load } from 'cheerio'
import fetch from 'node-fetch'
import { json } from 'stream/consumers'

interface Recipe {
  name: string
  description?: string
  image?: string
  video?: string
  ingredients: [string]
  instructions: [string]
  nutrition?: unknown
  recipeYield?: [string]
  prepTime?: string
  cookTime?: string
  totalTime?: string
}

class Recipe {
  constructor({ name, description, image, ingredients, instructions, nutrition, recipeYield }: Recipe) {
    this.name = name
    this.description = description
    this.image = image
    this.ingredients = ingredients
    this.instructions = instructions
    this.nutrition = nutrition
    this.recipeYield = recipeYield
  }
  static fromJSON = (json: unknown) => {
    let recipe: Recipe
    // json+ld appears to have 3? general formats
    //      1. Array of types (including recipe)
    //      2. Graph property with array of types (including recipe)
    //      3. Object with recipe top level
    // TODO: handle #3 differently, no reason to iterate or convert to array
    const jsonArray = Array.isArray(json) ? json : json['@graph'] || [json]
    try {
      jsonArray.forEach(
        (
          elem: Partial<Recipe> & {
            recipeIngredient: [string]
            recipeInstructions: [string]
          }
        ) => {
          if (elem['@type'] == 'Recipe') {
            recipe = {
              name: elem.name,
              description: elem.description,
              ingredients: elem.recipeIngredient,
              instructions: elem.recipeInstructions,
              recipeYield: elem.recipeYield,
              prepTime: elem.prepTime,
              cookTime: elem.cookTime,
              totalTime: elem.totalTime,
              nutrition: elem.nutrition,
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

const fetchDOMmodel = async (url) => {
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
  // There could be more than 1 ld+json scripts on the page, need the one with recipe
  // TODO: handle multiple ld+jsons
  let jsonld
  try {
    jsonld = $("script[type='application/ld+json']")
    if (jsonld.length > 1) {
      // find the one with recipe
      jsonld.each((_, elm) => {
        const html = $(elm).html()
        if (html.includes('"@type":"Recipe"')) {
          jsonld = JSON.parse(html)
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
  console.log(recipe)
}
