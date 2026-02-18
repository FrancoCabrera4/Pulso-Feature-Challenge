import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { zodResponseFormat, zodTextFormat } from 'openai/helpers/zod.js';
import { Observable } from 'rxjs';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { MorfeoInstructions, ResponseSchema } from 'src/recipes/prompts/prompts';
import { RecipesService } from 'src/recipes/recipes.service';
import { z } from 'zod'

interface StreamResponse {
  id: string;
  createdAt: number;
  data: string;
  finished?: boolean;
  finishReason?: string;
}

@Injectable()
export class ChatbotService {

  constructor(
    private recipeService: RecipesService
  ) {}

  async retrieveUsefulInformation(userInput: string) {
    const recipes = await this.recipeService.similaritySearch(userInput);
    return recipes.map((recipe) => recipe.recipeId);
  }

  queryChatbot(
    userInput: string,
    augmentedInformation: Recipe[]
  ): Observable<StreamResponse> {
    
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

    return new Observable<StreamResponse>(observer => {
      let abortController: AbortController;

      const startStream = async () => {
        try {
          abortController = new AbortController();

          const stream = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              { role: "system", content: MorfeoInstructions },
              { role: "system", content: "The retrieved recipes are: " + JSON.stringify(augmentedInformation)},
              { role: "user", content: userInput }
            ],
            stream: true,
            response_format: zodResponseFormat(ResponseSchema, 'response')
          }, { signal: abortController.signal });

          for await (const chunk of stream) {
              observer.next({
                id: chunk.id,
                createdAt: chunk.created,
                data: chunk.choices[0].delta.content || '',
                finished: chunk.choices[0].finish_reason === 'stop',
                finishReason: chunk.choices[0].finish_reason ? chunk.choices[0].finish_reason : undefined
              });
          }

          observer.complete();
        } catch (error) {
          console.log(error)
          observer.error(error);
        }
      }

      startStream()

      return () => {
        abortController?.abort();
      };
    });
  }
}
