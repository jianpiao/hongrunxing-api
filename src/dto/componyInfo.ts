// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class InfoDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  name: string;

  @Rule(RuleType.string())
  phone: string;

  @Rule(RuleType.string())
  qq: string;

  @Rule(RuleType.string())
  email: string;

  @Rule(RuleType.string())
  address: string;

  @Rule(RuleType.string())
  desc: string;

  @Rule(RuleType.string())
  show_img: string;

  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.string())
  bg_text: string;

  @Rule(RuleType.string())
  culture: string;
}
