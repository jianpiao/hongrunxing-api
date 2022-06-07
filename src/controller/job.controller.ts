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

  @Get('/get')
  async get() {
    const res = await this.jobService.get();
    return res;
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
