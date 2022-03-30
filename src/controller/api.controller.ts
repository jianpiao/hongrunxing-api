import { Inject, Controller, Post, Files, Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ApiService } from '../service/api.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: ApiService;

  @Get()
  async get() {
    return '宏润兴';
  }

  @Post('/upload')
  async upload(@Files() files) {
    console.log(files);
    const domain = 'http://127.0.0.1:7001/public/uploadFiles';
    const filePath = files[0].data.split('uploadFiles')[1];
    const path = domain + filePath;
    return {
      path,
    };
  }
}
