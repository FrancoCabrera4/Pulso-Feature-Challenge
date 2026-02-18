import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  imports: [RecipesModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService]
})
export class ChatbotModule {}
