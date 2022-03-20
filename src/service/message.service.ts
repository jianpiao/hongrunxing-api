import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Message } from '../entity/Message';
import { Between, Like, Repository } from 'typeorm';

export interface IMessage {
  id?: number;
  title?: string;
  phone?: string;
  username?: string;
  update_time?: number;
  create_time?: number;
  content?: string;
  type?: string;
  is_del?: number;
  current?: number;
  pageSize?: number;
}

@Provide()
export class MessageService {
  @InjectEntityModel(Message)
  messageModel: Repository<Message>;

  // save
  async save(body: IMessage) {
    const res = await this.messageModel.save(body);
    return res.id;
  }

  // find all
  async findAll(params: IMessage) {
    const {
      id,
      title = '',
      content = '',
      username = '',
      phone = '',
      pageSize,
      current,
      type = 'h5',
      create_time = new Date('2022-01-01 00:00:00'),
    } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;
    const res = await this.messageModel.find({
      where: {
        id,
        phone: Like(`%${phone}%`),
        title: Like(`%${title}%`),
        content: Like(`%${content}%`),
        username: Like(`%${username}%`),
        create_time: Between(new Date(create_time), new Date()),
        type: type,
        is_del: 0,
      },
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    console.log('res', res);
    const total = await this.messageModel.count();
    return {
      current: _current,
      pageSize: _pageSize,
      total,
      list: res,
    };
  }

  async findById(id: number) {
    const res = await this.messageModel.findOneBy({ id });
    return res;
  }

  async update(params: IMessage) {
    const { id, title, phone, content, username } = params;
    const res = await this.messageModel.findOneBy({ id });
    title && (res.title = title);
    phone && (res.phone = phone);
    content && (res.content = content);
    username && (res.username = username);
    const saveRes = await this.messageModel.save(res);
    return saveRes;
  }

  async delete(id: number) {
    const res = await this.messageModel.findOneBy({ id });
    res.is_del = 1;
    await this.messageModel.save(res);
    return '删除成功';
  }
}
