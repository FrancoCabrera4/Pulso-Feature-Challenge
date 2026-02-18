import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Recipe } from './recipes/entities/recipe.entity';
import { Ingredient } from './recipes/entities/ingredient.entity';
import { ProcedureStep } from './recipes/entities/procedureStep.entity';
import { Tag } from './recipes/entities/tag.entity';
import { NutritionalCategory } from './recipes/entities/nutritionaCategory.entity';
import { RecipeToNutritionalCategory } from './recipes/entities/recipeToNutritionalCategory.entity';
import { RecipeEmbedding } from './recipes/entities/recipeEmbedding.entity';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT!,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Recipe,
        Ingredient,
        ProcedureStep,
        Tag,
        NutritionalCategory,
        RecipeToNutritionalCategory,
        RecipeEmbedding,
      ],
      synchronize: true,
    }),
    RecipesModule,
    ChatbotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
