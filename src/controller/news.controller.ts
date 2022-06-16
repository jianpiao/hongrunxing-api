import { CacheManager } from '@midwayjs/cache';
import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  Body,
  Del,
  Param,
  Patch,
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

  @Inject()
  cacheManager: CacheManager;

  @Get('/get')
  async get(@Query() query: ListDTO) {
    const key = 'newsList';
    // 获取数据
    let result: string = await this.cacheManager.get(key);

    if (!result) {
      const res = await this.apiService.findAll(query);
      res.list.forEach(e => {
        e.content = e.content
          .replace(/<\/?.+?\/?>/g, '')
          .replace(/\s/g, '')
          .replace(/&nbsp;/g, '')
          .slice(0, 300);
      });
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }

    return result && JSON.parse(result);

    // const res = await this.apiService.findAll(query);
    // res.list.forEach(e => {
    //   e.content = e.content
    //     .replace(/<\/?.+?\/?>/g, '')
    //     .replace(/\s/g, '')
    //     .replace(/&nbsp;/g, '')
    //     .slice(0, 300);
    // });
    // return res;
  }

  @Get('/admin/get')
  async getAdmin(@Query() query: ListDTO) {
    const res = await this.apiService.findAll(query);
    return res;
  }

  @Get('/:id')
  async getById(@Param() params: IdDTO) {
    const key = 'newsDetail';
    // 获取数据
    let result: string = await this.cacheManager.get(key);

    if (!result) {
      const res = await this.apiService.findById(params.id);
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }

    return result && JSON.parse(result);

    // const res = await this.apiService.findById(params.id);
    // return res;
  }

  @Post('/admin')
  @Validate()
  async add(@Body() body: AddDTO) {
    const res = await this.apiService.save(body);
    return res;
  }

  @Patch('/admin/:id')
  @Validate()
  async update(@Param() params: IdDTO, @Body() body: UpdateDTO) {
    const res = await this.apiService.update(params.id, body);
    return res;
  }

  @Del('/admin/:id')
  @Validate()
  async del(@Param() params: IdDTO) {
    const res = await this.apiService.delete(params.id);
    return res;
  }

  // ---------- 分类管理 ----------
  @Get('/getCategory')
  async getCategory(@Query() query: ListCategoryDTO) {
    const res = await this.apiService.findCategory(query);
    return res;
  }

  @Get('/getCategoryList')
  async getCategoryList() {
    const res = await this.apiService.findCategoryList();
    return res;
  }

  @Get('/admin/category')
  async getCategoryAdmin(@Query() query: ListCategoryDTO) {
    const res = await this.apiService.findCategory(query);
    return res;
  }

  @Post('/admin/category')
  @Validate()
  async addCategory(@Body() body: AddCategoryDTO) {
    const res = await this.apiService.saveCategory(body);
    return res;
  }

  @Patch('/admin/category/:id')
  @Validate()
  async updateCategory(
    @Param() params: IdDTO,
    @Body() body: UpdateCategoryDTO
  ) {
    const res = await this.apiService.updateCategory(params.id, body);
    return res;
  }

  @Del('/admin/category/:id')
  @Validate()
  async delCategory(@Param() params: IdDTO) {
    const res = await this.apiService.deleteCategory(params.id);
    return res;
  }
}
