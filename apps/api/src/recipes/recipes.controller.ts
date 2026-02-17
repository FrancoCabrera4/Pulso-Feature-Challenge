import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
  
  @Get()
  async getListRecipes() {
    return await this.recipesService.getListRecipes();
  }

  @Get(':id')
  async getRecipeDetail(@Param('id') id: string) {
    return await this.recipesService.getRecipeDetail(id);
  }

}
