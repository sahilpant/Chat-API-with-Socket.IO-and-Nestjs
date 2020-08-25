import * as mongoose from 'mongoose';

export const signUpSchema = new mongoose.Schema({
    username: String,
    email: String
})