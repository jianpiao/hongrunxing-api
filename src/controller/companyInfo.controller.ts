import { Inject, Controller, Get, Body, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { InfoDTO } from '../dto/componyInfo';
import { CompanyInfoService } from '../service/companyInfo.service';
import { RedisService } from '@midwayjs/redis';

@Controller('/api/company_info')
export class CarouselController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: CompanyInfoService;

  @Inject()
  redisService: RedisService;

  @Get('/get')
  async get() {
    let result = await this.redisService.get('getCompanyInfo');

    if (!result) {
      const res = await this.apiService.findAll();
      await this.redisService.set(
        'getCompanyInfo',
        JSON.stringify(res),
        'ex',
        60 * 5
      );
      result = JSON.stringify(res);
    }

    return result && JSON.parse(result);
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
