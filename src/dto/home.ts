// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class GetDTO {
  @Rule(RuleType.string().required())
  type: string;
}

class ImagesDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  name: string;

  @Rule(RuleType.string())
  src: string;
}

export class UpdateProductDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.string())
  bg_text: string;

  @Rule(RuleType.string())
  desc: string;

  @Rule(RuleType.string())
  btn_text: string;

  @Rule(ImagesDTO, { required: false })
  images: ImagesDTO[];
}

export class UpdateServiceDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.string())
  desc: string;

  @Rule(ImagesDTO, { required: false })
  images: ImagesDTO[];
}

export class UpdateCaseDTO extends UpdateServiceDTO {
  @Rule(RuleType.string())
  bg_text: string;
}

export class UpdateNewsDTO extends UpdateCaseDTO {
  @Rule(ImagesDTO, { required: false })
  news: ImagesDTO[];
}
