import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Comments extends Document {
  @Prop({ required: true })
  comment: string;
  @Prop({ type: Types.ObjectId, ref: 'Posts', required: true })
  postId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  userId: Types.ObjectId;
}
export const CommentSchema = SchemaFactory.createForClass(Comments);
// upvotes: { type: Number },
// downvotes: { type: Number },
