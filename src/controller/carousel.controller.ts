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
import { CacheManager } from '@midwayjs/cache';
// import { RedisService } from '@midwayjs/redis';

@Controller('/api/carousel')
export class CarouselController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: CarouselService;

  // @Inject()
  // redisService: RedisService;

  @Inject()
  cacheManager: CacheManager;

  @Get('/get')
  async get(@Query() query: ListDTO) {
    const key = 'getCarouselList';
    // 获取数据
    let result: string = await this.cacheManager.get(key);

    if (!result) {
      const res = await this.apiService.findAll(query);
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }

    return result && JSON.parse(result);
    // const res = await this.apiService.findAll(query);
    // return res;
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
