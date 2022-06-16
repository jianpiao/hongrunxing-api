import { CacheManager } from '@midwayjs/cache';
import { Inject, Controller, Get, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { JobDTO } from '../dto/job';
import { JobService } from '../service/job.service';

@Controller('/api/job')
export class JobController {
  @Inject()
  ctx: Context;

  @Inject()
  jobService: JobService;

  @Inject()
  cacheManager: CacheManager;

  @Get('/get')
  async get() {
    const key = 'getJobList';
    let result: string = await this.cacheManager.get(key);
    if (!result) {
      const res = await this.jobService.get();
      await this.cacheManager.set(key, JSON.stringify(res));
      result = JSON.stringify(res);
    }

    return result && JSON.parse(result);
    // const res = await this.jobService.get();
    // return res;
  }

  @Get('/admin/get')
  async getAdmin() {
    const res = await this.jobService.get();
    return res;
  }

  @Post('/admin/update')
  @Validate()
  async update(@Body() body: JobDTO) {
    const res = await this.jobService.update(body);
    return res;
  }
}
