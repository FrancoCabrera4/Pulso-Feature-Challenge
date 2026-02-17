export interface Recipe {
    id: number;
    title: string;
    description: string;
    portions: number;
    preparationTimeMinutes: number;
    imageUrl: string;
}

export interface Tag {
    id: number;
    description: string;
}

export interface Ingredient {
    id: number;
    order: number;
    description: string;
}

export interface ProcedureStep {
  id: number;
  order: number;
  description: string;
}

export interface NutritionalCategory {
  id: number;
  description: string;
}

export interface RecipeToNutritionalCategory {
  id: number;
  recipeId: number;
  nutritionalCategoryId: number,
  value: string;
  nutritionalCategory: NutritionalCategory;
}

export interface RecipeDetail extends Recipe {
    ingredients: Ingredient[];
    procedure: ProcedureStep[];
    tags: Tag[];
    recipeToNutritionalCategory: RecipeToNutritionalCategory[];
}