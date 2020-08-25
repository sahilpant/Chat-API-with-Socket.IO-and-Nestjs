import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { signUpSchema } from './socket.schema';

@Module({
    imports:[MongooseModule.forFeature([{name:'test',schema: signUpSchema}])],
  controllers: [SocketController],
  providers: [SocketService]
})
export class SocketModule {
    
}
