// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class IdDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class AddDTO {
  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string())
  username: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string().min(5).max(11))
  phone: string;
}

export class UpdateDTO extends IdDTO {
  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.string())
  username: string;

  @Rule(RuleType.string())
  content: string;

  @Rule(RuleType.string().min(5).max(11))
  phone: string;
}

export class ListDTO extends UpdateDTO {
  @Rule(RuleType.string().required())
  type: string;

  @Rule(RuleType.number())
  current: number;

  @Rule(RuleType.number())
  pageSize: number;
}
