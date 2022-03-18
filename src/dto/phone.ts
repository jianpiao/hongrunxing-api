// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class IdDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class AddDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().min(5).max(11).required())
  phone: string;
}

export class UpdateDTO extends IdDTO {
  @Rule(RuleType.string())
  name: string;

  @Rule(RuleType.string().min(5).max(11))
  phone: string;
}

export class ListDTO extends UpdateDTO {
  @Rule(RuleType.number())
  current: number;

  @Rule(RuleType.number())
  pageSize: number;
}
