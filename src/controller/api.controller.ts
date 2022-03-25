import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  Files,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ApiService } from '../service/api.service';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  apiService: ApiService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/upload')
  async upload(@Files() files) {
    console.log(files);
    const domain = 'http://127.0.0.1:7001/public/uploadFiles';
    const filePath = files[0].data.split('uploadFiles')[1];
    const path = domain + filePath;
    return {
      success: true,
      errorMessage: 'OK',
      data: {
        path,
      },
    };
  }
}
