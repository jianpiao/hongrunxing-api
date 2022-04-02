import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('views', { schema: 'hongrunxing' })
export class Views {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  create_time: Date | null;

  @Column('varchar', { name: 'page_name', nullable: true, length: 255 })
  page_name: string | null;

  @Column('varchar', { name: 'type', nullable: true, length: 255 })
  type: string | null;
}
