import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'hongrunginx_666',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'mysql',
    host: '8.142.139.235',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'hongrunxing',
    synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
    logging: false,
    dateStrings: true,
  },
  validate: {
    validationOptions: {
      allowUnknown: true, // 全局生效
    },
  },
  // cors: { // 跨域
  //   credentials: false,
  //   origin: '*',
  //   allowHeaders: '*',
  // },
  upload: {
    mode: 'file',
    fileSize: '10mb',
    whitelist: [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.mp4',
      '.avi',
    ],
    tmpdir: join(__dirname, '../..', 'public/uploadFiles'),
    cleanTimeout: 24 * 60 * 60 * 1000,
  },
} as MidwayConfig;
