// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class IdDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class AddDTO {
  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.number().required())
  type: number;

  @Rule(RuleType.string().required())
  src: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string().required())
  author: string;
}

export class UpdateDTO extends IdDTO {
  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.number())
  type: number;

  @Rule(RuleType.string())
  src: string;

  @Rule(RuleType.string())
  content: string;

  @Rule(RuleType.string())
  author: string;
}

export class ListDTO extends UpdateDTO {
  @Rule(RuleType.number())
  current: number;

  @Rule(RuleType.number())
  pageSize: number;
}

export class AddCategoryDTO {
  @Rule(RuleType.string().required())
  name: string;
}

export class UpdateCategoryDTO extends IdDTO {
  @Rule(RuleType.string().required())
  name: string;
}

export class ListCategoryDTO {
  @Rule(RuleType.number())
  current: number;

  @Rule(RuleType.number())
  pageSize: number;

  @Rule(RuleType.number())
  id: number;

  @Rule(RuleType.string())
  name: string;
}
