import {
  Inject,
  Controller,
  Get,
  Query,
  Body,
  Put,
  Del,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { AddDTO, IdDTO, ListDTO } from '../dto/carousel';
import { CarouselService } from '../service/carousel.service';

@Controller('/api/carousel')
export class CarouselController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: CarouselService;

  @Get('/get')
  async get(@Query() query: ListDTO) {
    const res = await this.apiService.findAll(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Put('/add')
  @Validate()
  async add(@Body() body: AddDTO) {
    console.log(body);
    const res = await this.apiService.save(body.list);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Del('/del')
  @Validate()
  async del(@Body() body: IdDTO) {
    const res = await this.apiService.delete(body.id);
    return { success: true, errorMessage: 'OK', data: res };
  }
}
