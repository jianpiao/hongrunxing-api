import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('product', { schema: 'hongrunxing' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'desc', nullable: true, length: 255 })
  desc: string | null;

  @Column('varchar', { name: 'src', nullable: true, length: 255 })
  src: string | null;

  @Column('int', { name: 'category', nullable: true })
  category: number | null;

  @Column('int', { name: 'texture', nullable: true })
  texture: number | null;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('int', { name: 'is_del' })
  is_del: number;

  @Column('int', { name: 'recommend' })
  recommend: number;

  @Column('int', {
    name: 'price',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  price: number | null;

  @Column('timestamp', {
    name: 'create_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
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
