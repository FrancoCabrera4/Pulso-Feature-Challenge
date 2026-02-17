import { NestFactory } from "@nestjs/core";
import { AppModule } from "./../../src/app.module";
import { DataSource } from "typeorm";
import { Recipe } from "./../../src/recipes/entities/recipe.entity";
import { RecipeEmbedding } from "./../../src/recipes/entities/recipeEmbedding.entity";
import OpenAI from "openai";

async function generateEmbeddings() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const dataSource = app.get(DataSource);

  console.log('Database connected');
  
  const recipeRepo = dataSource.getRepository(Recipe);
  const recipeEmbeddingRepo = dataSource.getRepository(RecipeEmbedding);

  // clear existing embeddings
  await recipeEmbeddingRepo.deleteAll()

  const recipe = await recipeRepo.find({
    relations: {
      ingredients: true,
      procedure: true,
      tags: true,
      recipeToNutritionalCategory: {
        nutritionalCategory: true
      }
    }
  })
  
  const recipeDescriptions = recipe.map((recipe) => {
    return {
      id: recipe.id,
      description: `
        Recipe description: ${recipe.description}
        Recipe portions: ${recipe.portions}
        Recipe preparation time in minutes: ${recipe.preparationTimeMinutes}
        `
    }
  })

  const recipeDescriptionsEmbeddings: RecipeEmbedding[] = [];

  for (const recipeDescription of recipeDescriptions) {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: recipeDescription.description,
      encoding_format: "float",
    });

    const recipeEmbedding = new RecipeEmbedding();
    recipeEmbedding.recipeId = recipeDescription.id
    recipeEmbedding.type = "description";
    recipeEmbedding.content = embeddingResponse.data[0].embedding as number[];

    recipeDescriptionsEmbeddings.push(recipeEmbedding);
  }

  // Save embeddings to database
  await recipeEmbeddingRepo.save(recipeDescriptionsEmbeddings);

  console.log('Embeddins created correctly')

  await app.close();
}

generateEmbeddings().catch(console.error);