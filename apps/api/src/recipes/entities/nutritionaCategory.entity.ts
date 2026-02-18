import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeToNutritionalCategory } from './recipeToNutritionalCategory.entity';

@Entity()
export class NutritionalCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @OneToMany(
    () => RecipeToNutritionalCategory,
    (recipeToNutritionalCategory) =>
      recipeToNutritionalCategory.nutritionalCategory,
  )
  recipeToNutritionalCategory;
}
