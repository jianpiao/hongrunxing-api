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
  ListCategoryDTO,
  ListDTO,
  UpdateCategoryDTO,
  UpdateDTO,
} from '../dto/news';
import { NewsService } from '../service/new.service';

@Controller('/api/news')
export class NewsController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: NewsService;

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

  @Get('/getCategory')
  async getCategory(@Query() query: ListCategoryDTO) {
    const res = await this.apiService.findCategory(query);
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Get('/getCategoryList')
  async getCategoryList() {
    const res = await this.apiService.findCategoryList();
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
}
