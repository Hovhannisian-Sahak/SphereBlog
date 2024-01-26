import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Posts extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({
    default:
      'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg',
  })
  imageUrl?: string;
  @Prop({ type: Types.ObjectId, ref: 'Users' })
  userId: Types.ObjectId;
}
export const PostSchema = SchemaFactory.createForClass(Posts);
// upvotes: { type: Number },
// downvotes: { type: Number },
