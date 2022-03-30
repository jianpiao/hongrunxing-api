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
    return res;
  }

  @Get('/admin/getProduct')
  async getProductAdmin(@Query() query: GetDTO) {
    const res = await this.apiService.findAllProduct(query);
    return res;
  }

  @Post('/admin/updateProduct')
  @Validate()
  async updateProduct(@Body() body: UpdateProductDTO) {
    const res = await this.apiService.updateProduct(body);
    return res;
  }

  @Get('/getService')
  async getService(@Query() query: GetDTO) {
    const res = await this.apiService.findService(query);
    return res;
  }

  @Get('/admin/getService')
  async getServiceAdmin(@Query() query: GetDTO) {
    const res = await this.apiService.findService(query);
    return res;
  }

  @Post('/admin/updateService')
  @Validate()
  async updateService(@Body() body: UpdateServiceDTO) {
    const res = await this.apiService.updateService(body);
    return res;
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

  @Get('/admin/getCase')
  async getCaseAdmin(@Query() query: GetDTO) {
    const res = await this.apiService.findCase(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Post('/admin/updateCase')
  @Validate()
  async updateCase(@Body() body: UpdateCaseDTO) {
    const res = await this.apiService.updateCase(body);
    return res;
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

  @Get('/admin/getNews')
  async getNewsAdmin(@Query() query: GetDTO) {
    const res = await this.apiService.findNews(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Post('/admin/updateNews')
  @Validate()
  async updateNews(@Body() body: UpdateNewsDTO) {
    const res = await this.apiService.updateNews(body);
    return res;
  }

  @Del('/admin/delNews')
  @Validate()
  async delNews(@Body() body: IdDTO) {
    const res = await this.apiService.delNews(body.id);
    return res;
  }
}
