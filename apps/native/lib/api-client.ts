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

export interface NutritionalInfo {
  id: number;
  value: string;
  categoryDescription: string;
}