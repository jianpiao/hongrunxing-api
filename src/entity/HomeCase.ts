import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('home-case', { schema: 'hongrunxing' })
export class HomeCase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('varchar', { name: 'bg_text', nullable: true, length: 255 })
  bg_text: string | null;

  @Column('varchar', { name: 'desc', nullable: true, length: 255 })
  desc: string | null;

  @Column('timestamp', { name: 'create_time', nullable: true })
  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  create_time: Date | null;

  @Column('timestamp', {
    name: 'update_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
  })
  update_time: Date | null;

  @Column('varchar', { name: 'type', nullable: true, length: 255 })
  type: string | null;
}
