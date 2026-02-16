import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class ProcedureStep {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('int')
    order: number;

    @Column()
    description: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.procedure)
    recipe: Recipe;

}