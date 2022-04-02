import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('message', { schema: 'hongrunxing' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;

  @Column('varchar', {
    name: 'title',
    nullable: true,
    comment: '标题',
    length: 255,
  })
  title: string | null;

  @Column('varchar', {
    name: 'username',
    nullable: true,
    comment: '用户名',
    length: 255,
  })
  username: string | null;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '手机号',
    length: 255,
  })
  phone: string | null;

  @Column('varchar', {
    name: 'content',
    nullable: true,
    comment: '内容',
    length: 255,
  })
  content: string | null;

  @Column('varchar', {
    name: 'type',
    nullable: true,
    comment: '类型|h5|web',
    length: 255,
  })
  type: string | null;

  @Column('timestamp', {
    name: 'create_time',
    nullable: true,
    comment: '创建时间',
  })
  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  create_time: Date | null;

  @Column('timestamp', {
    name: 'update_time',
    nullable: true,
    comment: '更新时间',
  })
  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
  })
  update_time: Date | null;

  @Column('int', {
    name: 'is_del',
    nullable: true,
    comment: '删除',
    default: () => "'0'",
  })
  is_del: number | null;
}
