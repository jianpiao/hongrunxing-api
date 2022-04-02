import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('home_service', { schema: 'hongrunxing' })
export class HomeService {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('varchar', { name: 'desc', nullable: true, length: 255 })
  desc: string | null;

  @Column('varchar', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  // @Column('timestamp', {
  //   name: 'create_time',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  create_time: Date;

  // @Column('timestamp', {
  //   name: 'update_time',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
  })
  update_time: Date;
}
