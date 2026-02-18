import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { ProcedureStep } from './procedureStep.entity';
import { Tag } from './tag.entity';
import { RecipeToNutritionalCategory } from './recipeToNutritionalCategory.entity';
import { RecipeEmbedding } from './recipeEmbedding.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('int')
  portions: number;

  @Column()
  preparationTimeMinutes: number;

  @Column()
  imageUrl: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];

  @OneToMany(() => ProcedureStep, (procedureStep) => procedureStep.recipe)
  procedure: ProcedureStep[];

  @ManyToMany(() => Tag, (Tag) => Tag.recipes)
  @JoinTable()
  tags: Tag[];

  @OneToMany(
    () => RecipeToNutritionalCategory,
    (recipeToNutritionalCategory) => recipeToNutritionalCategory.recipe,
  )
  recipeToNutritionalCategory: RecipeToNutritionalCategory;

  @OneToMany(() => RecipeEmbedding, (recipeEmbedding) => recipeEmbedding.recipe)
  embeddings: RecipeEmbedding[];
}
