import { IMiddleware, MidwayHttpError } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Middleware()
export class SessionMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const user = ctx.session.user;
      if (user && user.id) {
        const userService = await ctx.requestContext.getAsync<UserService>(
          UserService
        );
        const userInfo = await userService.getUser(user.id);
        if (userInfo) {
          const result = await next();
          return result;
        } else {
          ctx.session = null;
          ctx.status = 401;
          throw new MidwayHttpError('用户未登录', 401);
        }
      } else {
        ctx.session = null;
        ctx.status = 401;
        throw new MidwayHttpError('用户未登录', 401);
      }
    };
  }

  match(ctx: Context): boolean {
    // 下面的匹配到的路由会执行此中间件
    if (ctx.path.indexOf('/admin/') > -1) {
      return true;
    }
  }

  static getName(): string {
    return 'cookie';
  }
}
