import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { NutritionalCategory } from './nutritionaCategory.entity';

@Entity()
export class RecipeToNutritionalCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipeId: number;

  @Column()
  nutritionalCategoryId: number;

  @Column()
  value: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeToNutritionalCategory)
  recipe: Recipe;

  @ManyToOne(
    () => NutritionalCategory,
    (nutritionalCategory) => nutritionalCategory.recipeToNutritionalCategory,
  )
  nutritionalCategory: NutritionalCategory;
}
