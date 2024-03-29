import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum userTypes {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
@Schema({
  timestamps: true,
})
export class Users extends Document {
  [key: string]: any;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, enum: [userTypes.ADMIN, userTypes.CUSTOMER] })
  type: string;
  @Prop({ default: false })
  isAdmin: boolean;
}
export const UserSchema = SchemaFactory.createForClass(Users);
