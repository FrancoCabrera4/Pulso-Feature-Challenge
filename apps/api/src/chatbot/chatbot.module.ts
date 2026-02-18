import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotGateway } from './chatbot.controller';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  imports: [RecipesModule],
  providers: [ChatbotGateway, ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
