import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Ingredient } from './entities/ingredient.entity';
import { ProcedureStep } from './entities/procedureStep.entity';
import { Tag } from './entities/tag.entity';
import { NutritionalCategory } from './entities/nutritionaCategory.entity';
import { RecipeToNutritionalCategory } from './entities/recipeToNutritionalCategory.entity';
import { RecipeEmbedding } from './entities/recipeEmbedding.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipe,
      Ingredient,
      ProcedureStep,
      Tag,
      NutritionalCategory,
      RecipeToNutritionalCategory,
      RecipeEmbedding,
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
