import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Between, Repository } from 'typeorm';
import { Views } from '../entity/Views';

interface IView {
  id?: number;
  page_name?: string;
  type: string;
}

interface ICount {
  page_name?: string;
  type?: string;
  create_time?: string;
}
@Provide()
export class ApiService {
  @InjectEntityModel(Views)
  viewsModel: Repository<Views>;

  async count(params: ICount) {
    const {
      type,
      create_time = new Date('2022-01-01 00:00:00'),
      page_name,
    } = params;
    const obj = {};
    type && (obj['type'] = type);
    create_time &&
      (obj['create_time'] = Between(new Date(create_time), new Date()));
    page_name && (obj['page_name'] = page_name);
    const res = await this.viewsModel.count({
      where: obj,
    });
    return res || 0;
  }

  async addView(body: IView) {
    const { page_name, type } = body;
    await this.viewsModel.save({
      page_name: page_name,
      type: type,
    });
  }
}
