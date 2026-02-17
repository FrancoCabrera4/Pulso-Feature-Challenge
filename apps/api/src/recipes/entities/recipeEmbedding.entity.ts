import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";


@Entity()
export class RecipeEmbedding {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "recipe_id" })
    recipeId: number;

    @Column()
    type: 'description' | 'ingredients' | 'nutritionalData'

    @Column('vector')
    content: number[]

    @ManyToOne(() => Recipe, (recipe) => recipe.embeddings)
    @JoinColumn({ name: "recipe_id", referencedColumnName: "id"})
    recipe: Recipe;
}