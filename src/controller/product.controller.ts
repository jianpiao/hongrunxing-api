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
import {
  AddCategoryDTO,
  AddDTO,
  IdDTO,
  ListDTO,
  UpdateCategoryDTO,
  UpdateDTO,
  ListCategoryDTO,
  ListTextureDTO,
  AddTextureDTO,
  UpdateTextureDTO,
  ListDataDTO,
} from '../dto/product';
import { ProductService } from '../service/product.service';

@Controller('/api/product')
export class ProductController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: ProductService;

  @Get('/get')
  async get(@Query() query: ListDTO) {
    const res = await this.apiService.findAll(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Get('/getList')
  async getList(@Query() query: ListDataDTO) {
    const res = await this.apiService.getList(query);
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

  @Get('/getCategory')
  async getCategory(@Query() query: ListCategoryDTO) {
    const res = await this.apiService.findCategory(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Put('/addCategory')
  @Validate()
  async addCategory(@Body() body: AddCategoryDTO) {
    const res = await this.apiService.saveCategory(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Post('/updateCategory')
  @Validate()
  async updateCategory(@Body() body: UpdateCategoryDTO) {
    const res = await this.apiService.updateCategory(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Del('/delCategory')
  @Validate()
  async delCategory(@Body() body: IdDTO) {
    const res = await this.apiService.deleteCategory(body.id);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Get('/getTexture')
  async getTexture(@Query() query: ListTextureDTO) {
    const res = await this.apiService.findTexture(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Put('/addTexture')
  @Validate()
  async addTexture(@Body() body: AddTextureDTO) {
    const res = await this.apiService.saveTexture(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Post('/updateTexture')
  @Validate()
  async updateTexture(@Body() body: UpdateTextureDTO) {
    const res = await this.apiService.updateTexture(body);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Del('/delTexture')
  @Validate()
  async delTexture(@Body() body: IdDTO) {
    const res = await this.apiService.deleteTexture(body.id);
    return { success: true, errorMessage: 'OK', data: res };
  }

  @Get('/getCategoryTree')
  @Validate()
  async getCategoryTree() {
    const res = await this.apiService.findCategoryTree();
    return { success: true, errorMessage: 'OK', data: res };
  }
}
