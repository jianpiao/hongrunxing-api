import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
// import NodeRSA from 'node-rsa';
import { ILogger } from '@midwayjs/logger';

/**
 * 密码加密，最好方案包含一下三点：
 * 1. 客户端对密码进行对称加密
 * 2. 使用https，ssl密文传输
 * 3. 利用ras非对称，公钥加密+私钥解密
 * 4. 用BCrypt或者PBKDF2单向加密存储
 * 参照：https://juejin.cn/post/7065624480537640997
 */

interface IUser {
  id?: number;
  type?: string;
  is_del?: number;
  username: string;
  password: string;
  avatar?: string;
}

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  logger: ILogger;

  async getUserList() {
    const obj = {
      is_del: 0,
    };
    const res = await this.userModel.find({
      where: obj,
    });
    return res.map(e => ({
      id: e.id,
      username: e.username,
      type: e.type,
      avatar: e.avatar,
    }));
  }

  async getUser(id: number) {
    const res = await this.userModel.findOneBy({ id: Number(id) });
    return {
      id: res.id,
      username: res.username,
      type: res.type,
      avatar: res.avatar,
    };
  }

  async login(params: IUser) {
    const { username, password } = params;
    const res = await this.userModel.findOneBy({
      username,
      password,
    });
    if (!res) {
      this.logger.warn('用户名或者密码不正确');
    }
    return {
      id: res.id,
      username: res.username,
      type: res.type,
      avatar: res.avatar,
    };
  }
}
