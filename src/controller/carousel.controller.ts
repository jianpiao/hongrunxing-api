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
import { RedisService } from '@midwayjs/redis';

@Controller('/api/carousel')
export class CarouselController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: CarouselService;

  @Inject()
  redisService: RedisService;

  @Get('/get')
  async get(@Query() query: ListDTO) {
    const key =
      query.type === 'web' ? 'getWebCarouselList' : 'getH5CarouselList';

    // 获取数据
    let result = await this.redisService.get(key);

    if (!result) {
      const res = await this.apiService.findAll(query);
      await this.redisService.set(key, JSON.stringify(res), 'EX', 10);
      result = JSON.stringify(res);
    }

    return result && JSON.parse(result);
  }

  @Get('/admin/get')
  async getAdmin(@Query() query: ListDTO) {
    const res = await this.apiService.findAll(query);
    return res;
  }

  @Put('/admin/add')
  @Validate()
  async add(@Body() body: AddDTO) {
    const res = await this.apiService.save(body.list);
    return res;
  }

  @Del('/admin/del')
  @Validate()
  async del(@Body() body: IdDTO) {
    const res = await this.apiService.delete(body.id);
    return res;
  }
}
