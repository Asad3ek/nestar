import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
  private logger: Logger = new Logger('SocketEventsGateway');
  private SummeryClient: number = 0;

  afterInit(server: Server) {
    this.logger.log(`Websocket Server Initialized total: ${this.SummeryClient}`)
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.SummeryClient++
    this.logger.log(`==> Client connected <==`)
    this.logger.log(`==> Total connection: ${this.SummeryClient} <==`)
  }

  handleDisconnect(client: WebSocket, ...args: any[]) {
    this.SummeryClient--
    this.logger.log(`==> Client Disconnected <==`)
    this.logger.log(`==> Rest of connection: ${this.SummeryClient} <==`)
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
