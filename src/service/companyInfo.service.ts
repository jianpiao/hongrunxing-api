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
    const {
      id,
      name = '',
      phone = '',
      qq = '',
      email = '',
      address = '',
      desc = '',
      show_img = '',
    } = params;
    const res = await this.apiModel.findOneBy({ id });
    name && (res.name = name);
    phone && (res.phone = phone);
    qq && (res.qq = qq);
    email && (res.email = email);
    address && (res.address = address);
    desc && (res.desc = desc);
    show_img && (res.show_img = show_img);
    const saveRes = await this.apiModel.save(res);
    return saveRes;
  }
}
