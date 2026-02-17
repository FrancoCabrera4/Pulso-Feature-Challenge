import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column('int')
    order: number;

    @Column('text')
    description: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
    recipe: Recipe;


}