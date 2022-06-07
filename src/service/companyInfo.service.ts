import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { CompanyInfo } from '../entity/CompanyInfo';

export interface ICompanyInfo {
  id?: number;
  name?: string;
  phone?: string;
  qq?: string;
  email?: string;
  address?: string;
  desc?: string;
  show_img?: string;
  title?: string;
  bg_text?: string;
  culture?: string;
}

@Provide()
export class CompanyInfoService {
  @InjectEntityModel(CompanyInfo)
  apiModel: Repository<CompanyInfo>;

  async findAll() {
    const res = await this.apiModel.find();
    return (res.length && res[0]) || {};
  }

  async update(params: ICompanyInfo) {
    const { id, ...args } = params;
    const res = await this.apiModel.findOneBy({ id });
    const obj = { ...args };
    Object.keys(obj).map(key => {
      obj[key] && (res[key] = obj[key]);
    });
    // name && (res.name = name);
    // phone && (res.phone = phone);
    // qq && (res.qq = qq);
    // email && (res.email = email);
    // address && (res.address = address);
    // desc && (res.desc = desc);
    // show_img && (res.show_img = show_img);
    // title && (res.title = title);
    // bg_text && (res.bg_text = bg_text);
    const saveRes = await this.apiModel.save(res);
    return saveRes;
  }
}
