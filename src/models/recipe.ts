import { model, Schema } from 'mongoose'

// custom tags might be nice
export interface IRecipe {
  name: string
  url?: string
  description?: string
  image?: string
  video?: string
  ingredients: [string]
  instructions: (HowToSection | string)[]
  nutrition?: Partial<INutrition>
  recipeYield?: string
  prepTime?: string
  cookTime?: string
  totalTime?: string
  notes?: string
}

export interface INutrition {
  calories: string
  carbohydrates: string
  cholesterol: string
  fat: string
  fiber: string
  protein: string
  saturatedFat: string
  servingSize: string
  sodium: string
  sugar: string
  transFat: string
  unsaturatedFat: string
}

interface IRecipeDocument extends IRecipe {
  user: Schema.Types.ObjectId
}

export type HowToSection = {
  name: string
  steps: string[]
}

const HowToSectionSchema = new Schema<HowToSection>({
  name: String,
  steps: [String],
})

const RecipeSchema = new Schema<IRecipeDocument>({
  name: String,
  url: String, // optional, users should be able to create one from a form
  description: String,
  image: String, // optional
  video: String, // optional
  notes: String, // optional
  ingredients: [String], // scraped recipe
  instructions: [HowToSectionSchema] || [String],
  cookTime: String, // optional, Convert these so they are the same shape internally!!!
  prepTime: String, // optional, Convert these so they are the same shape internally!!!
  totalTime: String, // optional, Convert these so they are the same shape internally!!!
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Recipe = model<IRecipeDocument>('Recipe', RecipeSchema)
export default Recipe
