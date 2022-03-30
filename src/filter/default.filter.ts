import { Catch, Inject } from '@midwayjs/decorator';
// import { Context } from '@midwayjs/koa';
import { ILogger } from '@midwayjs/logger';

@Catch()
export class DefaultErrorFilter {
  @Inject()
  logger: ILogger;

  async catch(err: Error) {
    this.logger.error(err);
    // 所有的未分类错误会到这里
    return {
      success: false,
      errorMessage: err.message,
    };
  }
}
