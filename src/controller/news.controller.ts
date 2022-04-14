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
    res.list.forEach(e => {
      e.content = e.content
        .replace(/<\/?.+?\/?>/g, '')
        .replace(/\s/g, '')
        .replace(/&nbsp;/g, '')
        .slice(0, 300);
    });
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

  @Get('/getCategory')
  async getCategory(@Query() query: ListCategoryDTO) {
    const res = await this.apiService.findCategory(query);
    return res;
  }

  @Get('/admin/getCategory')
  async getCategoryAdmin(@Query() query: ListCategoryDTO) {
    const res = await this.apiService.findCategory(query);
    return res;
  }

  @Get('/getCategoryList')
  async getCategoryList() {
    const res = await this.apiService.findCategoryList();
    return res;
  }

  @Put('/admin/addCategory')
  @Validate()
  async addCategory(@Body() body: AddCategoryDTO) {
    const res = await this.apiService.saveCategory(body);
    return res;
  }

  @Post('/admin/updateCategory')
  @Validate()
  async updateCategory(@Body() body: UpdateCategoryDTO) {
    const res = await this.apiService.updateCategory(body);
    return res;
  }

  @Del('/admin/delCategory')
  @Validate()
  async delCategory(@Body() body: IdDTO) {
    const res = await this.apiService.deleteCategory(body.id);
    return res;
  }
}
