import { SubscribeMessage, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect, WebSocketServer, WebSocketGateway } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: '/admin'})

export class TestGateway implements OnGatewayInit, OnGatewayConnection , OnGatewayDisconnect {
  
  private logger:Logger = new Logger('TestGateway');
  private check = {};
  private limit = 0;

  @WebSocketServer() wss:Server;

  
  afterInit(server: Server):void {
    this.logger.log(`initialised`);
  }
  handleConnection(client: Socket):void {
    client.on('user', (data) => {
      if(data === 'sahil' && this.limit < 2) {
        this.logger.log(`user connected ${data}`)
        this.wss.to(client.id).emit('joined', `welcome user ${data}`);
        this.check[client.id] = 'true';
        this.limit++;
        this.logger.log(this.limit);
      }
      else {
        this.logger.log(`unauthorised access ${data} `);
        client.disconnect();
      }
    })
  }
  handleDisconnect(client: Socket):void {
    this.logger.log(`${client.id} disconnected`);
  }

  @SubscribeMessage('chat')
  handleMessage(client: Socket, data: string):void {
    if(this.check[client.id]) this.wss.emit('chat',data);
    else client.disconnect();
  }

}