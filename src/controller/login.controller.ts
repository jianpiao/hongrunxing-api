import { MidwayHttpError } from '@midwayjs/core';
import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ILogger } from '@midwayjs/logger';
import { Validate } from '@midwayjs/validate';
import { IdDTO, LoginDTO, PhoneDTO } from '../dto/user';
import { UserService } from '../service/user.service';
// import { aesEncrypt } from '../utils/secret';

@Controller('/api/login')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  logger: ILogger;

  @Inject()
  userService: UserService;

  @Post('/account')
  @Validate()
  async login(@Body() body: LoginDTO) {
    const res = await this.userService.login(body);
    if (res) {
      this.ctx.session.user = {
        username: res.username,
        id: res.id,
        type: res.type,
      };
      this.ctx.session.maxAge = 24 * 3600 * 1000; // 一天
    } else {
      this.logger.error('用户名或者密码不正确');
      throw new MidwayHttpError('用户名或者密码不正确', 401);
    }
    return {
      username: res.username,
      type: res.type,
      id: res.id,
    };
  }

  @Post('/outLogin')
  @Validate()
  async outLogin(@Body() body: IdDTO) {
    console.log('退出', body.id);
    return '退出成功';
  }

  @Post('/captcha')
  @Validate()
  async captcha(@Body() body: PhoneDTO) {
    console.log('退出', body.phone);
    return '获取验证码成功';
  }
}
