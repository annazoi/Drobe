import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { Clothe } from 'src/schemas/clothe.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class ClothesService {
  constructor(
    @InjectModel(Clothe.name) private clotheModel: Model<Clothe>,
    private s3Service: S3Service,
  ) {}
  async create(
    userId: string,
    createClotheDto: CreateClotheDto,
    files: Express.Multer.File[],
  ) {
    try {
      const images = [];
      for (let i = 0; i < files?.length; i++) {
        const uploadedFileUrl = await this.s3Service.uploadFile(files[i]);
        images.push({
          file: uploadedFileUrl,
        });
      }
      const clothe = await this.clotheModel.create({
        ...createClotheDto,
        userId,
        images,
      });
      await clothe.save();
      return clothe;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async findAll(query: any) {
    try {
      const clothes = await this.clotheModel
        .find({ ...query })
        .populate('userId', '-password');
      return clothes || [];
    } catch (error) {
      return [];
    }
  }

  async findOne(id: string) {
    try {
      const clothe = await this.clotheModel
        .findById(id)
        .populate('userId', '-password');
      if (!clothe) {
        throw new NotFoundException('No clothe found');
      }
      return clothe;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new NotFoundException(error.message);
    }
  }
}
