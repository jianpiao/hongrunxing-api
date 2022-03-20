import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1647345618094_6588',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'mysql',
    host: 'localhost',
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
