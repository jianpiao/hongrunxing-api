import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { Context } from '@midwayjs/koa';
import {
  GetDTO,
  UpdateCaseDTO,
  UpdateNewsDTO,
  UpdateProductDTO,
  UpdateServiceDTO,
} from '../dto/home';
import { HomeService } from '../service/home.service';
import { IdDTO } from '../dto/carousel';

@Controller('/api/home')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: HomeService;

  @Get('/getProduct')
  async getProduct(@Query() query: GetDTO) {
    const res = await this.apiService.findAllProduct(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Post('/updateProduct')
  @Validate()
  async updateProduct(@Body() body: UpdateProductDTO) {
    const res = await this.apiService.updateProduct(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Get('/getService')
  async getService(@Query() query: GetDTO) {
    const res = await this.apiService.findService(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Post('/updateService')
  @Validate()
  async updateService(@Body() body: UpdateServiceDTO) {
    const res = await this.apiService.updateService(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Get('/getCase')
  async getCase(@Query() query: GetDTO) {
    const res = await this.apiService.findCase(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Post('/updateCase')
  @Validate()
  async updateCase(@Body() body: UpdateCaseDTO) {
    const res = await this.apiService.updateCase(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Get('/getNews')
  async getNews(@Query() query: GetDTO) {
    const res = await this.apiService.findNews(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Post('/updateNews')
  @Validate()
  async updateNews(@Body() body: UpdateNewsDTO) {
    const res = await this.apiService.updateNews(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Del('/delNews')
  @Validate()
  async delNews(@Body() body: IdDTO) {
    const res = await this.apiService.delNews(body.id);
    return { success: true, errorMessage: 'OK', data: res };
  }
}
