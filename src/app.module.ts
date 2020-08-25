import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { RedisModule} from 'nestjs-redis';
import { SocketModule } from './socket/socket.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      RedisModule.register({
        name:'test',
        url: 'redis://127.0.0.1:6379',
        port:6379,
        
      }),
      SocketModule,
      MongooseModule.forRoot('mongodb+srv://database:s2SbLGJ2GwJe52GB@cluster0.6hrmq.mongodb.net/socket?retryWrites=true&w=majority')
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
