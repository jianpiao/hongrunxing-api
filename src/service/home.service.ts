import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { In, Repository } from 'typeorm';
import { HomeCase } from '../entity/HomeCase';
import { HomeImages } from '../entity/HomeImages';
import { HomeNews } from '../entity/HomeNews';
import { HomeProduct } from '../entity/HomeProduct';
import { HomeService as HomeServices } from '../entity/HomeService';
import { News } from '../entity/News';
import { INews } from './new.service';

export interface IHomeProduct {
  id?: number;
  title?: string;
  bg_text?: string;
  desc?: string;
  btn_text?: string;
  type?: string;
  create_time?: string;
  update_time?: string;
  images?: { id: number; name: string; src: string; desc?: string }[];
}

export interface IHomeIMages {
  images?: { id: number; name: string; src: string; desc?: string }[];
}

export interface IHomeService extends IHomeIMages {
  id?: number;
  title?: string;
  desc?: string;
  type?: string;
  create_time?: string;
  update_time?: string;
}

export interface IHomeCase extends IHomeService {
  bg_text?: string;
}

export interface INewsService extends IHomeCase {
  news?: INews[];
}

@Provide()
export class HomeService {
  @InjectEntityModel(HomeProduct)
  homeProductModel: Repository<HomeProduct>;

  @InjectEntityModel(HomeImages)
  homeImagesModel: Repository<HomeImages>;

  @InjectEntityModel(HomeServices)
  homeServiceModel: Repository<HomeServices>;

  @InjectEntityModel(HomeCase)
  homeCaseModel: Repository<HomeCase>;

  @InjectEntityModel(HomeNews)
  homeNewsModel: Repository<HomeNews>;

  @InjectEntityModel(News)
  newsModel: Repository<News>;

  // save
  async save(body: IHomeProduct) {
    const res: IHomeProduct = await this.homeProductModel.save(body);
    return res.id;
  }

  // find all
  async findAllProduct(params: IHomeProduct) {
    const { type = 'web' } = params;
    const res = await this.homeProductModel.findOneBy({ type });
    const images = await this.homeImagesModel.find({
      where: {
        home_id: res.id,
      },
    });
    res['images'] = images;
    return res;
  }

  async updateProduct(params: IHomeProduct) {
    const { id, title, desc, bg_text, btn_text, images } = params;
    const res = await this.homeProductModel.findOneBy({ id });

    title && (res.title = title);
    bg_text && (res.bg_text = bg_text);
    desc && (res.desc = desc);
    btn_text && (res.btn_text = btn_text);

    const saveRes = await this.homeProductModel.save(res);

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imgRes = await this.homeImagesModel.findOneBy({
          id: images[i].id,
        });
        const { desc, name, src } = images[i];
        desc && (imgRes.desc = desc);
        name && (imgRes.name = name);
        src && (imgRes.src = src);
        await this.homeImagesModel.save(imgRes);
      }
    }
    return saveRes;
  }

  /** 我的服务 */
  async findService(params: IHomeService) {
    const { type = 'web' } = params;
    const res = await this.homeServiceModel.findOneBy({ type });
    const images = await this.homeImagesModel.find({
      where: {
        service_id: res.id,
      },
    });
    res['images'] = images;
    return res;
  }

  async updateService(params: IHomeService) {
    const { id, title, desc, images } = params;
    const res = await this.homeServiceModel.findOneBy({ id });

    title && (res.title = title);
    desc && (res.desc = desc);

    const saveRes = await this.homeServiceModel.save(res);

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imgRes = await this.homeImagesModel.findOneBy({
          id: images[i].id,
        });
        const { desc, name, src } = images[i];
        desc && (imgRes.desc = desc);
        name && (imgRes.name = name);
        src && (imgRes.src = src);
        await this.homeImagesModel.save(imgRes);
      }
    }
    return saveRes;
  }

  /** 案例 */
  async findCase(params: IHomeCase) {
    const { type = 'web' } = params;
    const res = await this.homeCaseModel.findOneBy({ type });
    const images = await this.homeImagesModel.find({
      where: {
        case_id: res.id,
      },
    });
    res['images'] = images;
    return res;
  }

  async updateCase(params: IHomeCase) {
    const { id, title, desc, images, bg_text } = params;
    const res = await this.homeCaseModel.findOneBy({ id });

    title && (res.title = title);
    desc && (res.desc = desc);
    bg_text && (res.bg_text = bg_text);

    const saveRes = await this.homeCaseModel.save(res);

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imgRes = await this.homeImagesModel.findOneBy({
          id: images[i].id,
        });
        const { desc, name, src } = images[i];
        desc && (imgRes.desc = desc);
        name && (imgRes.name = name);
        src && (imgRes.src = src);
        await this.homeImagesModel.save(imgRes);
      }
    }
    return saveRes;
  }

  /** 新闻 */
  async findNews(params: INewsService) {
    const { type = 'web' } = params;
    const res = await this.homeNewsModel.findOneBy({ type });
    const news = await this.newsModel.find({
      where: {
        home_id: res.id,
      },
    });
    res['news'] = news;
    return res;
  }

  async updateNews(params: INewsService) {
    const { id, title, desc, news, bg_text } = params;
    const res = await this.homeNewsModel.findOneBy({ id });

    title && (res.title = title);
    desc && (res.desc = desc);
    bg_text && (res.bg_text = bg_text);

    const saveRes = await this.homeNewsModel.save(res);

    if (news.length > 0) {
      const ids = news.map(e => e.id);
      const newsList = await this.newsModel.find({
        where: {
          id: In(ids),
        },
      });
      for (let i = 0; i < newsList.length; i++) {
        newsList[i].home_id = res.id;
        newsList[i].title = news[i].title;
        newsList[i].content = news[i].content;
        await this.newsModel.save(newsList[i]);
      }
    }

    return saveRes;
  }

  async delNews(id: number) {
    const res = await this.newsModel.findOneBy({ id });
    res.home_id = 0;
    const delRes = await this.newsModel.save(res);
    return delRes;
  }
}
