import { Column, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "@midwayjs/orm";

@EntityModel("news", { schema: "hongrunxing" })
export class News {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 255 })
  type: string | null;

  @Column("datetime", { name: "create_time", nullable: true })
  create_time: Date | null;

  @Column("datetime", { name: "update_time", nullable: true })
  update_time: Date | null;

  @Column("varchar", { name: "src", nullable: true, length: 255 })
  src: string | null;

  @Column("longtext", { name: "content", nullable: true })
  content: string | null;

  @Column("varchar", { name: "author", nullable: true, length: 255 })
  author: string | null;
}
