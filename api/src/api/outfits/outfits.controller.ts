import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OutfitsService } from './outfits.service';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { JwtGuard } from '../auth/guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Outfit } from 'src/schemas/outfit.schema';

@Controller('outfits')
@ApiTags('Outfits')
export class OutfitsController {
  constructor(private readonly outfitsService: OutfitsService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBearerAuth()
  @ApiOkResponse({ type: Outfit })
  async create(
    @Req() req: Express.Request,
    @Body() createOutfitDto: CreateOutfitDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const { userId } = req.user;
    
    console.log("FILES RECEIVED:", files?.map(f => f.fieldname));
    console.log("BODY RECEIVED:", createOutfitDto);

    // Express parses the AnyFilesInterceptor(). The file we named "imageFile" on the frontend will be here
    const imageFile = files?.length ? files[0] : undefined;

    return this.outfitsService.create(userId, createOutfitDto, imageFile);
  }

  @Get()
  @ApiOkResponse({ type: Outfit })
  async findAll(@Query() query: any, @Req() req: Express.Request) {
    return this.outfitsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outfitsService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outfitsService.remove(id);
  }
}
