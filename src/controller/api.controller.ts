import {
  Inject,
  Controller,
  Post,
  Files,
  Get,
  Body,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ViewCountDTO, ViewDTO } from '../dto/api';
import { ApiService } from '../service/api.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: ApiService;

  @Get()
  async get() {
    return '宏润兴地毯API';
  }

  @Post('/upload')
  async upload(@Files() files) {
    const base =
      process.env.NODE_ENV === 'production'
        ? 'http://www.hongrunxingcarpet.com'
        : 'http://127.0.0.1:7001';
    const domain = `${base}/public/uploadFiles`;
    const filePath = files[0].data.split('uploadFiles')[1];
    const path = domain + filePath;
    return {
      path,
    };
  }

  @Post('/view')
  async addView(@Body() body: ViewDTO) {
    await this.apiService.addView(body);
    return '';
  }

  @Get('/admin/viewCount')
  async viewCount(@Query() query: ViewCountDTO) {
    const res = await this.apiService.count(query);
    return res;
  }
}

@Controller('/')
export class IndexController {
  @Inject()
  ctx: Context;

  @Get()
  async get() {
    return '宏润兴地毯';
  }
}
