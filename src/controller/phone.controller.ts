import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Del,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { AddDTO, IdDTO, ListDTO, UpdateDTO } from '../dto/phone';
import { PhoneService } from '../service/phone.service';
// import { RedisService } from '@midwayjs/redis';

@Controller('/api/phone')
export class PhoneController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: PhoneService;

  // @Inject()
  // redisService: RedisService;

  @Get('/get')
  async get(@Query() query: ListDTO) {
    // // 获取数据
    // let result = await this.redisService.get('getPhoneList');

    // if (!result) {
    //   const res = await this.apiService.findAll(query);
    //   await this.redisService.set(
    //     'getPhoneList',
    //     JSON.stringify(res),
    //     'EX',
    //     60 * 5
    //   );
    //   result = JSON.stringify(res);
    // }

    // return result && JSON.parse(result);

    const res = await this.apiService.findAll(query);
    return res;
  }

  @Get('/admin/get')
  async getAdmin(@Query() query: ListDTO) {
    const res = await this.apiService.findAll(query);
    return res;
  }

  @Get('/get_by_id')
  async getById(@Query() query: IdDTO) {
    const res = await this.apiService.findById(query.id);
    return res;
  }

  @Get('/admin/get_by_id')
  async getByIdAdmin(@Query() query: IdDTO) {
    const res = await this.apiService.findById(query.id);
    return res;
  }

  @Put('/admin/add')
  @Validate()
  async add(@Body() body: AddDTO) {
    const res = await this.apiService.save(body);
    return res;
  }

  @Post('/admin/update')
  @Validate()
  async update(@Body() body: UpdateDTO) {
    const res = await this.apiService.update(body);
    return res;
  }

  @Del('/admin/del')
  @Validate()
  async del(@Body() body: IdDTO) {
    const res = await this.apiService.delete(body.id);
    return res;
  }
}
