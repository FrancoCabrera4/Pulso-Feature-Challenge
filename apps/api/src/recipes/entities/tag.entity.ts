import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";


@Entity()
export class Tag {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    description: string;

    @ManyToMany(() => Recipe, (recipe) => recipe.tags)
    recipes: Recipe[]
    
}