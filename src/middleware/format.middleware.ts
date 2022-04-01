import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

/**
 * 格式化返回的格式
 */
@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const data = await next();
      return { success: true, message: 'OK', data: data };
    };
  }

  match(ctx) {
    return ctx.path.indexOf('/api') !== -1;
  }
}
