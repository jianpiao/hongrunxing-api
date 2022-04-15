import { Configuration, App, Logger } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as orm from '@midwayjs/orm';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as upload from '@midwayjs/upload';
import * as staticFile from '@midwayjs/static-file';
import * as crossDomain from '@midwayjs/cross-domain';
import { ILogger } from '@midwayjs/logger';
import { FormatMiddleware } from './middleware/format.middleware';
import { SessionMiddleware } from './middleware/cookie.middleware';
// import * as redis from '@midwayjs/redis';

@Configuration({
  imports: [
    orm,
    koa,
    upload,
    validate,
    staticFile,
    // redis, // 使用redis
    crossDomain,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @Logger()
  logger: ILogger;

  @App()
  app: koa.Application;

  start = 0;

  async onConfigLoad?(): Promise<void> {
    this.start = Date.now();
    this.logger.info('启动服务器~');
  }

  async onReady(): Promise<void> {
    this.logger.info('启动耗时 %d ms', Date.now() - this.start);

    // add middleware
    this.app.useMiddleware([
      SessionMiddleware,
      ReportMiddleware,
      FormatMiddleware,
    ]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
