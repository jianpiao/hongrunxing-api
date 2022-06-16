import { CacheManager } from '@midwayjs/cache';
import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  Body,
  Del,
  Patch,
  Param,
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
  RecommendDTO,
} from '../dto/product';
import { ProductService } from '../service/product.service';

@Controller('/api/product')
export class ProductController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: ProductService;

  @Inject()
  cacheManager: CacheManager;

  @Get('/get')
  async get(@Query() query: ListDTO) {
    const key = 'getProduct';
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

  @Get('/getRecommend')
  async getRecommend(@Query() query: RecommendDTO) {
    const res = await this.apiService.findAll({
      current: 1,
      pageSize: 6,
      recommend: 1,
      ...query,
    });
    return res;
  }

  @Get('/getList')
  async getList(@Query() query: ListDataDTO) {
    const key = 'getList';
    let result: string = await this.cacheManager.get(key);
    if (!result) {
      const res = await this.apiService.getList(query);
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }
    return result && JSON.parse(result);
    // const res = await this.apiService.getList(query);
    // return res;
  }

  @Get('/:id')
  async getById(@Param() params: IdDTO) {
    const res = await this.apiService.findById(params.id);
    return res;
  }

  @Post('/admin')
  @Validate()
  async add(@Body() body: AddDTO) {
    const res = await this.apiService.save(body);
    return res;
  }

  @Patch('/admin/:id')
  @Validate()
  async update(@Body() body: UpdateDTO, @Param() params: IdDTO) {
    const res = await this.apiService.update(params.id, body);
    return res;
  }

  @Del('/admin/:id')
  @Validate()
  async del(@Param() params: IdDTO) {
    const res = await this.apiService.delete(params.id);
    return res;
  }

  @Get('/getCategoryList')
  async getCategoryList(@Query() query: RecommendDTO) {
    const key = 'getCategoryList';
    let result: string = await this.cacheManager.get(key);
    if (!result) {
      const res = await this.apiService.findCategoryList(query.type);
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }
    return result && JSON.parse(result);
    // const res = await this.apiService.findCategoryList(query.type);
    // return res;
  }

  @Get('/getCategory')
  async getCategory(@Query() query: ListCategoryDTO) {
    const key = 'getCategory';
    let result: string = await this.cacheManager.get(key);
    if (!result) {
      const res = await await this.apiService.findCategory(query);
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }
    return result && JSON.parse(result);
    // const res = await this.apiService.findCategory(query);
    // return res;
  }

  @Get('/admin/category')
  async getCategoryAdmin(@Query() query: ListCategoryDTO) {
    const res = await this.apiService.findCategory(query);
    return res;
  }

  @Get('/admin/getCategoryMap')
  async getCategoryMap(@Query() query: ListCategoryDTO) {
    const res = await this.apiService.findCategoryMap(query);
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
    @Body() body: UpdateCategoryDTO,
    @Param() params: IdDTO
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

  @Get('/getTexture')
  async getTexture(@Query() query: ListTextureDTO) {
    const key = 'getTexture';
    let result: string = await this.cacheManager.get(key);
    if (!result) {
      const res = await this.apiService.findTexture(query);
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }
    return result && JSON.parse(result);
    // const res = await this.apiService.findTexture(query);
    // return res;
  }

  @Get('/admin/texture')
  async getTextureAdmin(@Query() query: ListTextureDTO) {
    const res = await this.apiService.findTexture(query);
    return res;
  }

  @Patch('/admin/texture/:id')
  @Validate()
  async addTexture(@Body() body: UpdateTextureDTO, @Param() params: IdDTO) {
    const res = await this.apiService.updateTexture(params.id, body);
    return res;
  }

  @Post('/admin/texture')
  @Validate()
  async updateTexture(@Body() body: AddTextureDTO) {
    const res = await this.apiService.saveTexture(body);
    return res;
  }

  @Del('/admin/texture/:id')
  @Validate()
  async delTexture(@Param() params: IdDTO) {
    const res = await this.apiService.deleteTexture(params.id);
    return res;
  }

  @Get('/getCategoryTree')
  @Validate()
  async getCategoryTree() {
    const key = 'getCategoryTree';
    let result: string = await this.cacheManager.get(key);
    if (!result) {
      const res = await this.apiService.findCategoryTree();
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }
    return result && JSON.parse(result);
    // const res = await this.apiService.findCategoryTree();
    // return res;
  }

  @Get('/admin/getCategoryTree')
  @Validate()
  async getCategoryTreeAdmin() {
    const res = await this.apiService.findCategoryTree();
    return res;
  }
}
