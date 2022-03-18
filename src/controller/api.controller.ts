import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
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

  @Get('/get_carousel')
  async getCarousel(@Query('uid') uid) {
    const data = await this.apiService.getCarousel({ uid });
    return { success: true, message: 'OK', data: data };
  }
}
