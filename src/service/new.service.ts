import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { News, NewsCategory } from '../entity/News';
import { Between, Like, Repository } from 'typeorm';

export interface INews {
  id?: number;
  title?: string;
  type?: number;
  src?: string;
  content?: string;
  author?: string;
  update_time?: number;
  create_time?: number;
  current?: number;
  pageSize?: number;
  is_del?: number;
  home_id?: number;
}

export interface INewsCategory {
  id?: number;
  name?: string;
  is_del?: number;
  update_time?: number;
  create_time?: number;
  current?: number;
  pageSize?: number;
}

@Provide()
export class NewsService {
  @InjectEntityModel(News)
  newsModel: Repository<News>;

  @InjectEntityModel(NewsCategory)
  newsCategoryModel: Repository<NewsCategory>;

  // save
  async save(body: INews) {
    const res: INews = await this.newsModel.save(body);
    return res.id;
  }

  // find all
  async findAll(params: INews) {
    const {
      id,
      title = '',
      src = '',
      content = '',
      author = '',
      // type,
      pageSize,
      current,
      create_time = new Date('2022-01-01 00:00:00'),
      update_time = new Date('2022-01-01 00:00:00'),
    } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;
    const obj = {
      title: Like(`%${title}%`),
      src: Like(`%${src}%`),
      content: Like(`%${content}%`),
      author: Like(`%${author}%`),
      create_time: Between(new Date(create_time), new Date()),
      update_time: Between(new Date(update_time), new Date()),
      is_del: 0,
    };
    Number(id) && (obj['id'] = id);
    // Number(type) && (obj['type'] = type);
    const res = await this.newsModel.find({
      where: obj,
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    const total = await this.newsModel.count({
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
    const res = await this.newsModel.findOneBy({ id });
    const category = await this.newsCategoryModel.findOneBy({
      id: res.type,
    });
    res['category_name'] = category.name;
    return res;
  }

  async update(id: number, params: INews) {
    const { title, content, src, author } = params;
    const res = await this.newsModel.findOneBy({ id });

    title && (res.title = title);
    content && (res.content = content);
    src && (res.src = src);
    author && (res.author = author);

    const saveRes = await this.newsModel.save(res);
    return saveRes;
  }

  async delete(id: number) {
    const res = await this.newsModel.findOneBy({ id });
    res.is_del = 1;
    await this.newsModel.save(res);
    return '删除成功';
  }

  /** ~~~~~~~~~~~分类~~~~~~~~~~~~~ */
  async saveCategory(body: INewsCategory) {
    const res: INewsCategory = await this.newsCategoryModel.save(body);
    return res.id;
  }

  async findCategory(params: INewsCategory) {
    const {
      id,
      name = '',
      pageSize,
      current,
      create_time = new Date('2022-01-01 00:00:00'),
      update_time = new Date('2022-01-01 00:00:00'),
    } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;
    const res = await this.newsCategoryModel.find({
      where: {
        id,
        name: Like(`%${name}%`),
        create_time: Between(new Date(create_time), new Date()),
        update_time: Between(new Date(update_time), new Date()),
        is_del: 0,
      },
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    const total = await this.newsCategoryModel.count({
      where: {
        is_del: 0,
      },
    });
    return {
      current: _current,
      pageSize: _pageSize,
      total,
      list: res,
    };
  }

  async findCategoryList() {
    const res = await this.newsCategoryModel.find({
      where: {
        is_del: 0,
      },
    });
    return res.map(e => ({
      id: e.id,
      name: e.name,
    }));
  }

  async updateCategory(id: number, params: INewsCategory) {
    const { name } = params;
    const res = await this.newsCategoryModel.findOneBy({ id });
    name && (res.name = name);
    const saveRes = await this.newsCategoryModel.save(res);
    return saveRes;
  }

  async deleteCategory(id: number) {
    const news = await this.newsModel.find({
      where: {
        type: id,
      },
    });
    for (let i = 0; i < news.length; i++) {
      news[i].is_del = 1;
      await this.newsModel.save(news[i]);
    }
    const res = await this.newsCategoryModel.findOneBy({ id });
    res.is_del = 1;
    await this.newsCategoryModel.save(res);
    return '删除成功';
  }
}
