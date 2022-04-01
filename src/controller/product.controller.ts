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
  RecommendDTO,
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
    return res;
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
    const res = await this.apiService.getList(query);
    return res;
  }

  @Get('/get_by_id')
  async getById(@Query() query: IdDTO) {
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

  @Get('/getCategoryList')
  async getCategoryList(@Query() query: RecommendDTO) {
    const res = await this.apiService.findCategoryList(query.type);
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

  @Get('/getTexture')
  async getTexture(@Query() query: ListTextureDTO) {
    const res = await this.apiService.findTexture(query);
    return res;
  }

  @Get('/admin/getTexture')
  async getTextureAdmin(@Query() query: ListTextureDTO) {
    const res = await this.apiService.findTexture(query);
    return res;
  }

  @Put('/admin/addTexture')
  @Validate()
  async addTexture(@Body() body: AddTextureDTO) {
    const res = await this.apiService.saveTexture(body);
    return res;
  }

  @Post('/admin/updateTexture')
  @Validate()
  async updateTexture(@Body() body: UpdateTextureDTO) {
    const res = await this.apiService.updateTexture(body);
    return res;
  }

  @Del('/admin/delTexture')
  @Validate()
  async delTexture(@Body() body: IdDTO) {
    const res = await this.apiService.deleteTexture(body.id);
    return res;
  }

  @Get('/getCategoryTree')
  @Validate()
  async getCategoryTree() {
    const res = await this.apiService.findCategoryTree();
    return res;
  }

  @Get('/admin/getCategoryTree')
  @Validate()
  async getCategoryTreeAdmin() {
    const res = await this.apiService.findCategoryTree();
    return res;
  }
}
