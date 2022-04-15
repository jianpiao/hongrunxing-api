import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Product } from '../entity/Product';
import { ProductCategory } from '../entity/ProductCategory';
import { ProductTexture } from '../entity/ProductTexture';
import { Between, Like, Repository } from 'typeorm';
import { ProductImages } from '../entity/ProductImages';

export interface IProduct {
  id?: number;
  name?: string;
  type?: string;
  desc?: string;
  src?: string;
  images?: Array<{ id: number; src: string; father_id: number; type: string }>;
  content?: string;
  category?: number;
  texture?: number;
  price?: number;
  update_time?: number;
  create_time?: number;
  current?: number;
  pageSize?: number;
  is_del?: number;
  recommend?: number;
}

export interface IProductTexture {
  id?: number;
  name?: string;
  is_del?: number;
  father_id?: number;
  type: string;
  update_time?: number;
  create_time?: number;
  current?: number;
  pageSize?: number;
}

export interface IProductCategory {
  id?: number;
  name?: string;
  is_del?: number;
  type: string;
  update_time?: number;
  create_time?: number;
  current?: number;
  pageSize?: number;
}

interface IOption {
  label: string;
  value: number;
}

interface IGetList {
  type: string;
  texture_id: number;
  category_id: number;
  current?: number;
  pageSize?: number;
  name?: string;
  desc?: string;
  price?: number;
}

export interface IOptions extends IOption {
  children: IOption[];
}

@Provide()
export class ProductService {
  @InjectEntityModel(Product)
  productModel: Repository<Product>;

  @InjectEntityModel(ProductCategory)
  productCategoryModel: Repository<ProductCategory>;

  @InjectEntityModel(ProductTexture)
  productTextureModel: Repository<ProductTexture>;

  @InjectEntityModel(ProductImages)
  productImagesModel: Repository<ProductImages>;

  /**  ~~~~~~~ 产品和案例 ~~~~~~~~ **/

  // save
  async save(body: IProduct) {
    const images = body.images || [];
    body.src = body.images.length > 0 ? body.images[0].src : ''; // 取第一张图作为主图
    delete body.images;
    const res: IProduct = await this.productModel.save(body);
    for (let i = 0; i < images.length; i++) {
      const params = {
        type: body.type,
        src: images[i].src,
        father_id: res.id,
      };
      await this.productImagesModel.save(params);
    }
    return res.id;
  }

  // find all
  async getList(params: IGetList) {
    const {
      name = '',
      desc = '',
      texture_id,
      category_id,
      type = 'product',
      price,
      pageSize,
      current,
    } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;

    const obj = {
      name: Like(`%${name}%`),
      desc: Like(`%${desc}%`),
      type: type,
      is_del: 0,
    };
    if (Number(category_id)) {
      obj['category'] = category_id;
    } else {
      Number(texture_id) && (obj['texture'] = texture_id);
    }
    Number(price) && (obj['price'] = price);
    const res = await this.productModel.find({
      where: obj,
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    const total = await this.productModel.count({
      where: obj,
    });
    return {
      current: _current,
      pageSize: _pageSize,
      total,
      list: res,
    };
  }

  // find all
  async findAll(params: IProduct) {
    const {
      id,
      name = '',
      desc = '',
      content = '',
      category,
      texture,
      type = 'product',
      price,
      pageSize,
      recommend,
      current,
      create_time = new Date('2022-01-01 00:00:00'),
      update_time = new Date('2022-01-01 00:00:00'),
    } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;
    const obj = {
      name: Like(`%${name}%`),
      desc: Like(`%${desc}%`),
      content: Like(`%${content}%`),
      category: category && Like(category),
      type: type,
      texture: texture && Like(texture),
      price: price && Like(price),
      create_time: Between(new Date(create_time), new Date()),
      update_time: Between(new Date(update_time), new Date()),
      is_del: 0,
    };
    if (id) {
      obj['id'] = id;
    }
    if (recommend) {
      obj['recommend'] = recommend;
    }
    const res = await this.productModel.find({
      where: obj,
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    const total = await this.productModel.count({
      where: obj,
    });
    // 查找图片
    for (let i = 0; i < res.length; i++) {
      res[i]['images'] = await this.productImagesModel.find({
        where: {
          father_id: res[i].id,
          is_del: 0,
        },
      });
    }
    return {
      current: _current,
      pageSize: _pageSize,
      total,
      list: res,
    };
  }

  async findById(id: number) {
    const res = await this.productModel.findOneBy({ id });
    return res;
  }

  async update(params: IProduct) {
    const {
      id,
      name,
      desc,
      category,
      texture,
      type,
      content,
      price,
      recommend,
      src,
      images,
    } = params;
    const res = await this.productModel.findOneBy({ id });

    name && (res.name = name);
    content && (res.content = content);
    desc && (res.desc = desc);
    category && (res.category = category);
    texture && (res.texture = texture);
    type && (res.type = type);
    price && (res.price = price);
    (recommend === 0 || recommend === 1) && (res.recommend = recommend);
    src && (res.src = images.length > 0 ? images[0].src : src);

    const imageList = await this.productImagesModel.find({
      where: {
        is_del: 0,
        father_id: id,
      },
    });
    const fatherIds = images.map(e => e.father_id);
    // 删除原始数据
    const delList = imageList
      .filter(e => e.id !== 0)
      .filter(e => !fatherIds.includes(e.id))
      .map(e => ({ ...e, is_del: 1 }));
    // 添加新数据
    const addList = images.filter(e => e.id === 0);

    // 修改旧数据
    await this.productImagesModel.save(delList);
    // 添加数据
    await this.productImagesModel.save(addList);

    const saveRes = await this.productModel.save(res);
    return saveRes;
  }

  async delete(id: number) {
    const res = await this.productModel.findOneBy({ id });
    res.is_del = 1;
    await this.productModel.save(res);
    return '删除成功';
  }

  /** ~~~~~~~~~~~产品/案例分类~~~~~~~~~~~~~ */
  async saveCategory(body: IProductCategory) {
    const res: IProductCategory = await this.productCategoryModel.save(body);
    return res.id;
  }

  async findCategoryList(type: string) {
    const category = await this.productCategoryModel.find({
      where: {
        type,
        is_del: 0,
      },
    });
    const texture = await this.productTextureModel.find({
      where: {
        type,
        is_del: 0,
      },
    });

    const obj = texture.reduce((cur: any, pre) => {
      if (cur[pre.father_id]) {
        cur[pre.father_id].push(pre);
      } else {
        cur[pre.father_id] = [pre];
      }
      return cur;
    }, {});
    return category.map(e => ({
      id: e.id,
      name: e.name,
      children: obj[e.id] || [],
    }));
  }

  async findCategory(params: IProductCategory) {
    const {
      id,
      name = '',
      pageSize,
      type = 'product',
      current,
      create_time = new Date('2022-01-01 00:00:00'),
      update_time = new Date('2022-01-01 00:00:00'),
    } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;
    const obj = {
      id,
      type,
      name: Like(`%${name}%`),
      create_time: Between(new Date(create_time), new Date()),
      update_time: Between(new Date(update_time), new Date()),
      is_del: 0,
    };
    const res = await this.productCategoryModel.find({
      where: obj,
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    const total = await this.productCategoryModel.count({
      where: obj,
    });
    return {
      current: _current,
      pageSize: _pageSize,
      total,
      list: res,
    };
  }

  async updateCategory(params: IProductCategory) {
    const { id, name } = params;
    const res = await this.productCategoryModel.findOneBy({ id });
    name && (res.name = name);
    const saveRes = await this.productCategoryModel.save(res);
    return saveRes;
  }

  // 删除分类，将绑定该分类的一并删除
  async deleteCategory(id: number) {
    const product = await this.productModel.find({
      where: {
        category: id,
      },
    });
    for (let i = 0; i < product.length; i++) {
      product[i].is_del = 1;
      await this.productModel.save(product[i]);
    }
    const res = await this.productCategoryModel.findOneBy({ id });
    res.is_del = 1;
    await this.productCategoryModel.save(res);
    return '删除成功';
  }

  /** ~~~~~~~~~~~产品材质~~~~~~~~~~~~~ */
  async saveTexture(body: IProductTexture) {
    const res: IProductTexture = await this.productTextureModel.save(body);
    return res.id;
  }

  async findTexture(params: IProductTexture) {
    const {
      id,
      name = '',
      pageSize,
      father_id,
      current,
      type,
      create_time = new Date('2022-01-01 00:00:00'),
      update_time = new Date('2022-01-01 00:00:00'),
    } = params;
    const _pageSize = (pageSize && Number(pageSize)) || 10;
    const _current = (current && Number(current)) || 1;
    const obj = {
      id,
      type,
      name: Like(`%${name}%`),
      father_id: father_id && Like(father_id),
      create_time: Between(new Date(create_time), new Date()),
      update_time: Between(new Date(update_time), new Date()),
      is_del: 0,
    };
    const res = await this.productTextureModel.find({
      where: obj,
      order: {
        id: 'ASC',
      },
      skip: (_current - 1) * _pageSize,
      take: _pageSize,
    });
    const total = await this.productTextureModel.count({
      where: obj,
    });
    return {
      current: _current,
      pageSize: _pageSize,
      total,
      list: res,
    };
  }

  async updateTexture(params: IProductTexture) {
    const { id, name, father_id } = params;
    const res = await this.productTextureModel.findOneBy({ id });
    name && (res.name = name);
    father_id && (res.father_id = father_id);
    const saveRes = await this.productTextureModel.save(res);
    return saveRes;
  }

  // 删除分类，将绑定该分类的一并删除
  async deleteTexture(id: number) {
    const product = await this.productModel.find({
      where: {
        texture: id,
      },
    });
    for (let i = 0; i < product.length; i++) {
      product[i].is_del = 1;
      await this.productModel.save(product[i]);
    }
    const res = await this.productTextureModel.findOneBy({ id });
    res.is_del = 1;
    await this.productTextureModel.save(res);
    return '删除成功';
  }

  async findCategoryTree() {
    const texture = await this.productTextureModel.find();
    const fatherIds = [...new Set(texture.map(e => e.father_id))];
    const list: IOptions[] = [];
    for (let i = 0; i < fatherIds.length; i++) {
      const res = await this.productCategoryModel.findOneBy({
        id: fatherIds[i],
      });
      list.push({
        label: res.name,
        value: res.id,
        children: [],
      });
    }
    for (let i = 0; i < list.length; i++) {
      list[i].children = texture
        .filter(e => e.father_id === list[i].value)
        .map(e => ({ label: e.name, value: e.id }));
    }
    return list;
  }
}
