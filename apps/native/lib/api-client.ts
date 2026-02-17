import Constants from 'expo-constants';
import { Recipe, RecipeDetail } from "./api-client.interface"

const API_URL = Constants.expoConfig?.extra?.apiUrl || process.env.API_URL || 'http://localhost:3000';

export async function getListRecipes() {

  const url = `${API_URL}/recipes`
  

  try {
    const data = await fetch(url, { method: 'GET' })
    
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`)
    }
    
    const recipes = await data.json()
    return recipes as Recipe[]
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw error
  }
}

export async function getRecipeDetail(recipeId: string) {

  const url = `${API_URL}/recipes/${recipeId}`
  

  try {
    const data = await fetch(url, { method: 'GET' })
    
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`)
    }
    
    const recipe = await data.json()
    return recipe as RecipeDetail
  } catch (error) {
    console.error('Error fetching recipe:', error)
    throw error
  }
}