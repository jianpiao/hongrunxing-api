import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Views } from '../entity/Views';

interface IView {
  id?: number;
  page_name?: string;
  type: string;
}
@Provide()
export class ApiService {
  @InjectEntityModel(Views)
  viewsModel: Repository<Views>;

  async count(params: { type: string }) {
    const res = await this.viewsModel.count({
      where: {
        type: params.type,
      },
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
