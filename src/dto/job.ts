import { Rule, RuleType } from '@midwayjs/validate';

export class JobDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  content: string;
}
