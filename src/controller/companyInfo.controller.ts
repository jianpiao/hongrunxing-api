import { Inject, Controller, Get, Query, Body, Put } from '@midwayjs/decorator';
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
    return {
      success: true,
      errorMessage: 'OK',
      data: res,
    };
  }

  @Put('/update')
  @Validate()
  async update(@Body() body: InfoDTO) {
    const res = await this.apiService.update(body);
    return { success: true, errorMessage: 'OK', data: res };
  }
}
