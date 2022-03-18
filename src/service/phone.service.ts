import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Phone } from '../entity/Phone';
import { Like, Repository } from 'typeorm';

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
  photoModel: Repository<Phone>;

  // save
  async save(body: IPhone) {
    const phoneResult = await this.photoModel.save(body);
    return phoneResult.id;
  }

  // find all
  async findAll(params: IPhone) {
    const { id, name = '', phone = '', pageSize, current } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;
    const res = await this.photoModel.find({
      where: {
        id,
        name: Like(`%${name}%`),
        phone: Like(`%${phone}%`),
        is_del: 0,
      },
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    const total = await this.photoModel.count();
    return {
      current: _current,
      pageSize: _pageSize,
      total,
      list: res,
    };
  }

  async findById(id: number) {
    const res = await this.photoModel.findOneBy({ id });
    return res;
  }

  async update(params: IPhone) {
    const { id, name, phone } = params;
    const res = await this.photoModel.findOneBy({ id });
    name && (res.name = name);
    phone && (res.phone = phone);
    const saveRes = await this.photoModel.save(res);
    return saveRes;
  }

  async delete(id: number) {
    const res = await this.photoModel.findOneBy({ id });
    res.is_del = 1;
    await this.photoModel.save(res);
    return '删除成功';
  }
}
