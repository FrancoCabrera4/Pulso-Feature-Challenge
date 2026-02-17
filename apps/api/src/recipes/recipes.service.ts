import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {

  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>
  ) {}

  async getListRecipes() {
    return await this.recipeRepository.find();
  }

  async getRecipeDetail(recipeId: string) {
    const recipe = await this.recipeRepository.findOne({
      relations: {
        ingredients: true,
        procedure: true,
        tags: true,
        recipeToNutritionalCategory: {
          nutritionalCategory: true
        }
      },
      where: {
        id: +recipeId
      }
    })

    return recipe
  }
}
