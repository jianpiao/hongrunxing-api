// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class IdDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class AddListDTO {
  @Rule(RuleType.string().required())
  path: string;

  @Rule(RuleType.string().required())
  type: string;
}

export class AddDTO {
  @Rule(AddListDTO)
  list: AddListDTO[];
}

export class ListDTO {
  @Rule(RuleType.string().required())
  type: string;
}
