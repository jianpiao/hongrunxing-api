import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('productTexture', { schema: 'hongrunxing' })
export class ProductTexture {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'father_id', nullable: true })
  father_id: number | null;

  @Column('int', { name: 'is_del' })
  is_del: number;

  @Column('timestamp', {
    name: 'create_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @UpdateDateColumn({
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
