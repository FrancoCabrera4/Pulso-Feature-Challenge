import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { RecipeEmbedding } from './entities/recipeEmbedding.entity';
import OpenAI from 'openai';
import { cosineSimilarity } from 'src/helpers/rag';

@Injectable()
export class RecipesService {

  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeEmbedding)
    private recipeEmbeddingRepository: Repository<RecipeEmbedding>
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

  async similaritySearch(query: string) {
     const openai = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY,
     });

     const queryEmbedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
      encoding_format: "float"
     })

    const queryVector = queryEmbedding.data[0].embedding as number[];

    const allEmbeddings = await this.recipeEmbeddingRepository.find({
      relations: {
        recipe: true
      }
    });

    const similarities = allEmbeddings.map((embedding) => {
      const similarity = cosineSimilarity(queryVector, embedding.content);
      return {
        recipeId: embedding.recipe,
        similarity,
      };
    });

    const topResults = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 2);

    return topResults;
  }
}
