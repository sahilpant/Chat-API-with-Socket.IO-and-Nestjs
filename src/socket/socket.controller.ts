import { Controller, Post, Body, Get } from '@nestjs/common';
import { SocketService } from './socket.service';
import { signup } from 'src/dto/signUP.dto';

@Controller('socket')
export class SocketController {
    constructor (private SocketService: SocketService){}

    @Post('post')
    Post(@Body() signup:signup){
        return this.SocketService.signUP(signup);
    }

    @Get('get')
    async users(@Body() keyword:string ):Promise<signup[]>{
        const user = await this.SocketService.users(keyword);
        return user;    
    }
}
