import { InjectModel } from '@nestjs/mongoose';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { Outfit } from 'src/schemas/outfit.schema';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model, Error } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class OutfitsService {
  constructor(
    @InjectModel(Outfit.name) private outfitModel: Model<Outfit>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(userId: string, createOutfitDto: CreateOutfitDto, imageFile?: Express.Multer.File) {
    try {
      // const { clothes, colorScheme, rating, notes, type } = createOutfitDto;
      const clothesObj = createOutfitDto.clothes.map((clothe) => ({ clothe }));
      let imageUrl = null;

      if (imageFile) {
        const uploadedUrl = await this.cloudinaryService.uploadFile(imageFile);
        imageUrl = uploadedUrl;
      }

      const outfit = new this.outfitModel({
        ...createOutfitDto,
        clothes: clothesObj,
        userId,
        image: imageUrl,
      });

      await outfit.save();
      return outfit;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async findAll(query: any) {
    try {
      const outfits = await this.outfitModel
        .find({ ...query })
        .populate('userId clothes.clothe', '-password');
      if (!outfits) {
        throw new ForbiddenException('No outfits found');
      }
      return outfits;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const outfit = await this.outfitModel
        .findById(id)
        .populate('userId clothes.clothe', '-password');
      if (!outfit) {
        throw new ForbiddenException('No outfit found');
      }
      return outfit;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const outfit = await this.outfitModel.findByIdAndDelete(id);
      if (!outfit) {
        throw new ForbiddenException('No outfit found');
      }
      return outfit;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
