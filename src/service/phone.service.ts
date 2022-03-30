import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Phone } from '../entity/Phone';
import { Between, Like, Repository } from 'typeorm';

export interface IPhone {
  id?: number;
  name?: string;
  phone?: string;
  update_time?: number;
  create_time?: number;
  current?: number;
  pageSize?: number;
}

@Provide()
export class PhoneService {
  @InjectEntityModel(Phone)
  phoneModel: Repository<Phone>;

  // save
  async save(body: IPhone) {
    const phoneResult = await this.phoneModel.save(body);
    return phoneResult.id;
  }

  // find all
  async findAll(params: IPhone) {
    const {
      id,
      name = '',
      phone = '',
      pageSize,
      current,
      create_time = new Date('2022-01-01 00:00:00'),
      update_time = new Date('2022-01-01 00:00:00'),
    } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;
    const obj = {
      id,
      name: Like(`%${name}%`),
      phone: Like(`%${phone}%`),
      create_time: Between(new Date(create_time), new Date()),
      update_time: Between(new Date(update_time), new Date()),
      is_del: 0,
    };
    id && (obj['id'] = id);
    const res = await this.phoneModel.find({
      where: obj,
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    const total = await this.phoneModel.count({
      where: obj,
    });
    return {
      current: _current,
      pageSize: _pageSize,
      total,
      list: res,
    };
  }

  async findById(id: number) {
    const res = await this.phoneModel.findOneBy({ id });
    return res;
  }

  async update(params: IPhone) {
    const { id, name, phone } = params;
    const res = await this.phoneModel.findOneBy({ id });
    name && (res.name = name);
    phone && (res.phone = phone);
    const saveRes = await this.phoneModel.save(res);
    return saveRes;
  }

  async delete(id: number) {
    const res = await this.phoneModel.findOneBy({ id });
    res.is_del = 1;
    await this.phoneModel.save(res);
    return '删除成功';
  }
}
