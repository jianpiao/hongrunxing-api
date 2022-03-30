import { Inject, Controller, Get, Body, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { InfoDTO } from '../dto/componyInfo';
import { CompanyInfoService } from '../service/companyInfo.service';

@Controller('/api/company_info')
export class CarouselController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: CompanyInfoService;

  @Get('/get')
  async get() {
    const res = await this.apiService.findAll();
    return res;
  }

  @Get('/admin/get')
  async getAdmin() {
    const res = await this.apiService.findAll();
    return res;
  }

  @Post('/admin/update')
  @Validate()
  async update(@Body() body: InfoDTO) {
    console.log('body', body);
    const res = await this.apiService.update(body);
    return res;
  }
}
