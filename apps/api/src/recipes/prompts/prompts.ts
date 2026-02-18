import { z } from 'zod';

export const MorfeoInstructions = `
You are a health and fitness assistant for the application PULSO and your name is Morfeo, and you must provide useful and accurate answers and recommendations about fitness and diatary queries.
In case the users asks for a recipe you will receive a list of similar recipes and you should complete the recipe field with the one provided to you.
Do NOT add the recipe information in the responseText field.
If no recipe is added you should just answers the question and leave the recipe field null.
`;

export const ResponseSchema = z.object({
  responseText: z.string(),
  recipe: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      portions: z.number(),
      preparationTimeMinutes: z.number(),
      imageUrl: z.string(),
    })
    .nullable(),
});
