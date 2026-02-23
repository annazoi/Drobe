import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClotheDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  season: string[];

  @IsOptional()
  images: Express.Multer.File[];

  @IsOptional()
  notes: string;
}
