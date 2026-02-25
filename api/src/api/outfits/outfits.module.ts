import { Module } from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { OutfitsController } from './outfits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OutfitSchema } from 'src/schemas/outfit.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Outfit', schema: OutfitSchema }]),
    CloudinaryModule,
  ],
  exports: [OutfitsService],
  controllers: [OutfitsController],
  providers: [OutfitsService],
})
export class OutfitsModule {}
