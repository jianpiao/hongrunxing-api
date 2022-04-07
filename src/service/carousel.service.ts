import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { rmdirSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { Carousel } from '../entity/Carousel';
import { ILogger } from '@midwayjs/logger';

export interface ICarousel {
  id?: number;
  path?: string;
  id_del?: boolean;
  create_time?: number;
  update_time?: number;
  type?: string;
}

@Provide()
export class CarouselService {
  @Inject()
  logger: ILogger;

  @InjectEntityModel(Carousel)
  apiModel: Repository<Carousel>;

  async save(body: ICarousel[]) {
    // const notInIds = body.filter(e => e.id !== 0);
    // const notInRow = await this.apiModel.find({
    //   where: {
    //     id: Not(In(notInIds)),
    //   },
    // });
    // notInRow.map(e => {
    //   e.is_del = 1;
    //   return e;
    // });
    // 删除没用的数据
    // await this.apiModel.save(notInRow);

    const addList = body
      .filter(e => e.id === 0)
      .map(e => ({ path: e.path, type: e.type }));

    // 删除不用的数据
    const originIds = body.filter(e => e.id !== 0).map(e => e.id);
    let list = await this.apiModel.find({
      where: {
        type: body.length > 0 ? body[0].type : '',
        is_del: 0,
      },
    });
    list = list
      .filter(e => !originIds.includes(e.id))
      .map(e => ({
        ...e,
        is_del: 1,
      }));

    // 新增数据
    await this.apiModel.save(addList);
    // 更新旧数据
    await this.apiModel.save(list);
    return '处理成功';
  }

  // find all
  async findAll(params: ICarousel) {
    const { type = 'web' } = params;
    const res = await this.apiModel.find({
      where: {
        type,
        is_del: 0,
      },
      order: {
        id: 'ASC',
      },
    });
    return {
      list: res,
    };
  }

  async update(params: ICarousel) {
    const { id, path } = params;
    const res = await this.apiModel.findOneBy({ id });
    path && (res.path = path);
    const saveRes = await this.apiModel.save(res);
    return saveRes;
  }

  async delete(id: number) {
    const res = await this.apiModel.findOneBy({ id });
    res.is_del = 1;
    await this.apiModel.save(res);
    const url = join(
      __dirname,
      '../..',
      'public/uploadFiles',
      res.path.split('public/uploadFiles')[1]
    );
    rmdirSync(url);
    return '删除成功';
  }
}
