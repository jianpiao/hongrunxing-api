// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class IdDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class AddDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.string().required())
  desc: string;

  @Rule(RuleType.string().required())
  src: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.number().required())
  category: number;

  @Rule(RuleType.number().required())
  texture: number;

  @Rule(RuleType.number().required())
  price: number;
}

export class UpdateDTO extends IdDTO {
  @Rule(RuleType.string())
  name: string;

  @Rule(RuleType.string())
  type: string;

  @Rule(RuleType.string())
  desc: string;

  @Rule(RuleType.string())
  src: string;

  @Rule(RuleType.string())
  content: string;

  @Rule(RuleType.number())
  category: number;

  @Rule(RuleType.number())
  texture: number;

  @Rule(RuleType.number())
  price: number;
}

export class ListDTO extends UpdateDTO {
  @Rule(RuleType.number())
  current: number;

  @Rule(RuleType.number())
  pageSize: number;
}

export class AddCategoryDTO {
  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.string().required())
  name: string;
}

export class RecommendDTO {
  @Rule(RuleType.string().required())
  type: string;
}

export class ListDataDTO {
  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.number())
  texture_id: number;

  @Rule(RuleType.number())
  category_id: number;

  @Rule(RuleType.string())
  name: string;

  @Rule(RuleType.string())
  desc: string;

  @Rule(RuleType.number())
  price: number;

  @Rule(RuleType.number())
  current: number;

  @Rule(RuleType.number())
  pageSize: number;
}

export class UpdateCategoryDTO extends IdDTO {
  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.string().required())
  name: string;
}

export class ListCategoryDTO extends UpdateCategoryDTO {
  @Rule(RuleType.number())
  current: number;

  @Rule(RuleType.number())
  pageSize: number;
}

export class AddTextureDTO {
  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.number().required())
  father_id: number;
}

export class UpdateTextureDTO extends IdDTO {
  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.string())
  name: string;

  @Rule(RuleType.number())
  father_id: number;
}

export class ListTextureDTO extends UpdateTextureDTO {
  @Rule(RuleType.number())
  current: number;

  @Rule(RuleType.number())
  pageSize: number;
}
