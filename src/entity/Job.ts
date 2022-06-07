import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('job', { schema: 'hongrunxing' })
export class Job {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('longtext', { name: 'content', nullable: true, comment: '内容' })
  content: string | null;
}
