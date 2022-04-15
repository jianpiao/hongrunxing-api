import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('product_images', { schema: 'hongrunxing' })
export class ProductImages {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'src', nullable: true, length: 255 })
  src: string | null;

  @Column('varchar', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  @Column('int', { name: 'is_del', nullable: true })
  is_del: number | null;

  @Column('int', { name: 'father_id', nullable: true })
  father_id: number | null;
}
