import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { IdDTO } from '../dto/user';
import { SessionMiddleware } from '../middleware/cookie.middleware';
import { UserService } from '../service/user.service';

@Controller('/api')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  @Validate()
  async getUser(@Query() uid: IdDTO) {
    const res = await this.userService.getUser(uid.id);
    return res;
  }

  @Get('/get_user_list', { middleware: [SessionMiddleware] })
  async getUserList() {
    const res = await this.userService.getUserList();
    return res;
  }
}
