import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { RedisService } from 'nestjs-redis';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


  constructor(
    private readonly redisService: RedisService,
  ){}
  
  @WebSocketServer() wss: Server;
  
   private logger: Logger = new Logger('AppGateway');

   private users:any = {};
   private userid:any = [];
   private ctr = 0;

  handleDisconnect(client:Socket):void {
    this.logger.log(`user ${this.users[client.id]} left the channel`);
    client.broadcast.emit(`user ${this.users[client.id]} left the channel`);
    delete this.users[client.id];
  }
  
  handleConnection(client: Socket, ...args:any[]):void {
    this.users[client.id] = ++this.ctr;
    this.userid.push(client.id)
    this.logger.log(`user connected ${client.id}`);
    client.broadcast.emit(`user ${this.users[client.id]} joined the channel`);
    this.wss.to(this.userid[this.ctr-1]).emit(`Welcome To the server user ${this.ctr}`)
  }
  
  afterInit(server: Server):void {
    this.logger.log('initiated');
  }
  
  
  async func(user:Socket,data:string,time:number): Promise<void>{
    const client = this.redisService.getClient('test');
    const myDate = new Date(time);
    await client.hmset(data,myDate.toLocaleString('en-In',{
      hour12:false,
    }),user.id);
  }

  @SubscribeMessage('chat')
  async handleMessage(client: Socket, data: string): Promise<void> {
    await this.func(client,data,Date.now());
    this.wss.emit('chat',`message from user ${this.users[client.id]} ==>> ${data}`);
  }
}
