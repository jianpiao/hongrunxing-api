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
import { AddDTO, IdDTO, ListDTO, UpdateDTO } from '../dto/message';
import { MessageService } from '../service/message.service';

@Controller('/api/message')
export class MessageController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: MessageService;

  @Get('/get')
  async get(@Query() query: ListDTO) {
    const res = await this.apiService.findAll(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Get('/get_by_id')
  async getById(@Query() query: IdDTO) {
    const res = await this.apiService.findById(query.id);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Put('/add')
  @Validate()
  async add(@Body() body: AddDTO) {
    const res = await this.apiService.save(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Post('/update')
  @Validate()
  async update(@Body() body: UpdateDTO) {
    const res = await this.apiService.update(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Del('/del')
  @Validate()
  async del(@Body() body: IdDTO) {
    const res = await this.apiService.delete(body.id);
    return { success: true, errorMessage: 'OK', data: res };
  }
}
