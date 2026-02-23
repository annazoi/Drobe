import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { ClotheSchema } from 'src/schemas/clothe.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Clothe', schema: ClotheSchema }]),
    CloudinaryModule,
  ],
  exports: [ClothesService],
  controllers: [ClothesController],
  providers: [ClothesService],
})
export class ClothesModule {}
