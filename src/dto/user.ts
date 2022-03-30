// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class IdDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class LoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}

export class PhoneDTO {
  @Rule(RuleType.number().min(11).max(11).required())
  phone: number;
}
