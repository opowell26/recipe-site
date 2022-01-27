import { Schema } from "mongoose";

const RecipeSchema = {
    name: String,
    url: String,
    image: ??, // optional
    notes: ??, // optional
    recipe: ??, // scraped recipe
    user
}