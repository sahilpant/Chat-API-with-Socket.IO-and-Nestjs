import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { RedisModule} from 'nestjs-redis';

@Module({
  imports: [
      RedisModule.register({
        name:'test',
        url: 'redis://127.0.0.1:6379',
        port:6379,
        
      }),
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
