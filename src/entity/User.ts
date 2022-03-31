import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('user', { schema: 'hongrunxing' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'username', nullable: true, length: 255 })
  username: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 255 })
  password: string | null;

  @Column('varchar', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  @Column('varchar', { name: 'avatar', nullable: true, length: 255 })
  avatar: string | null;

  @Column('int', { name: 'is_del', default: () => "'0'" })
  is_del: number;

  @Column('timestamp', {
    name: 'create_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_time: Date | null;

  @Column('timestamp', {
    name: 'update_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_time: Date | null;
}
