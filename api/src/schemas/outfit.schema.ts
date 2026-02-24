import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Clothe } from './clothe.schema';

@Schema({
  timestamps: true,
})
export class OutfitClothe {
  @Prop({ type: Types.ObjectId, ref: 'Clothe' })
  clothe: Types.ObjectId;
}
export const OutfitClotheSchema = SchemaFactory.createForClass(OutfitClothe);

@Schema({
  timestamps: true,
})
export class Outfit {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: [OutfitClotheSchema], required: true })
  clothes: OutfitClothe[];

  @Prop()
  image: string;

  @Prop()
  colorScheme?: string;

  @Prop()
  rating?: number;

  @Prop()
  notes?: string;

  @Prop()
  type: string;
}
export const OutfitSchema = SchemaFactory.createForClass(Outfit);
