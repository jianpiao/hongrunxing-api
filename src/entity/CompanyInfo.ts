import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('company_info', { schema: 'hongrunxing' })
export class CompanyInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 255 })
  phone: string | null;

  @Column('varchar', { name: 'qq', nullable: true, length: 255 })
  qq: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('text', { name: 'desc', nullable: true })
  desc: string | null;

  @Column('varchar', { name: 'show_img', nullable: true })
  show_img: string | null;

  @Column('varchar', { name: 'bg_text', nullable: true })
  bg_text: string | null;

  @Column('varchar', { name: 'title', nullable: true })
  title: string | null;

  @Column('longtext', { name: 'culture', nullable: true })
  culture: string | null;
}
