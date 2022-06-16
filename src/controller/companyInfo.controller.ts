import { Inject, Controller, Get, Body, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { InfoDTO } from '../dto/componyInfo';
import { CompanyInfoService } from '../service/companyInfo.service';
import { CacheManager } from '@midwayjs/cache';

// import { RedisService } from '@midwayjs/redis';

@Controller('/api/company_info')
export class CarouselController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: CompanyInfoService;

  // @Inject()
  // redisService: RedisService;

  @Inject()
  cacheManager: CacheManager; // 依赖注入 CacheManager

  @Get('/get')
  async get() {
    const key = 'getCompanyInfo';
    let result: string = await this.cacheManager.get(key);

    if (!result) {
      const res = await this.apiService.findAll();
      await this.cacheManager.set(key, JSON.stringify(res), { ttl: 60 });
      result = JSON.stringify(res);
    }

    return result && JSON.parse(result);

    // const res = await this.apiService.findAll();
    // return res;
  }

  @Get('/admin/get')
  async getAdmin() {
    const res = await this.apiService.findAll();
    return res;
  }

  @Post('/admin/update')
  @Validate()
  async update(@Body() body: InfoDTO) {
    const res = await this.apiService.update(body);
    return res;
  }
}
