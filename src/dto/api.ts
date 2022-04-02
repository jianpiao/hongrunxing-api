import { Rule, RuleType } from '@midwayjs/validate';

export class ViewDTO {
  @Rule(RuleType.string().required())
  page_name: string;

  @Rule(RuleType.string().required())
  type: string;
}

export class ViewCountDTO {
  @Rule(RuleType.string())
  type: string;

  @Rule(RuleType.string())
  create_time: string;
}
