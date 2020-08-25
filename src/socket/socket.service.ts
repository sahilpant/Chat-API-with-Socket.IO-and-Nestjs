import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { signUpSchema } from './socket.schema';
import { signup } from 'src/dto/signUP.dto';
import { Model } from 'mongoose';

@Injectable()
export class SocketService {
    constructor (@InjectModel('test') private readonly signUpModel:Model<signup> ){}

    async signUP( signUP: signup ){
        const { username , email } = signUP;
        const user = this.signUpModel({
            username,
            email
        })
        await user.save();
        return user;
    }

    async users(keyword:string):Promise<signup[]>{
        const user = await this.signUpModel.find(keyword).exec();
        return user;
    }
}
