import { Body, Controller, Post, Query, Sse } from "@nestjs/common";
import { ChatbotService } from "./chatbot.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface SseEvent {
  data: string;
  id?: string;
}
@Controller('chatbot')
export class ChatbotController {

    constructor(
        private chatbotService: ChatbotService
    ) {}

    @Sse()
    async sendMessage(@Query() { userQuery }: { userQuery: string }): Promise<Observable<SseEvent>> {

        const augmentedInformation = await this.chatbotService.retrieveUsefulInformation(userQuery)

        return this.chatbotService.queryChatbot(userQuery, augmentedInformation).pipe(
            map(chunk => ({
                id: chunk.id,
                data: chunk.data
            }))
        );
    }

}