import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatbotService } from './chatbot.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chatbot',
})
export class ChatbotGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private chatbotService: ChatbotService) {}

  handleConnection(client: Socket) {
    const userQuery = client.handshake.query.userQuery as string;

    if (!userQuery) {
      client.emit('error', {
        message: 'userQuery parameter is required',
      });
      client.disconnect();
      return;
    }

    this.handleChatbotStream(userQuery, client);
  }

  private async handleChatbotStream(
    userQuery: string,
    client: Socket,
  ): Promise<void> {
    try {
      const augmentedInformation =
        await this.chatbotService.retrieveSimilarRecipes(userQuery);

      const subscription = this.chatbotService
        .queryChatbot(userQuery, augmentedInformation)
        .subscribe({
          next: (chunk) => {
            client.emit('message', {
              id: chunk.id,
              data: chunk.data,
              finished: chunk.finished,
              finishReason: chunk.finishReason,
            });
          },
          error: (error) => {
            client.emit('error', {
              message: 'An error occurred while processing your request',
              error: error.message,
            });
          },
          complete: () => {
            client.emit('complete', {
              message: 'Stream completed',
            });
          },
        });

      client.once('disconnect', () => {
        subscription.unsubscribe();
      });
    } catch (error) {
      client.emit('error', {
        message: 'An error occurred while processing your request',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
