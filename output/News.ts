import { Column, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "@midwayjs/orm";

@EntityModel("news", { schema: "hongrunxing" })
export class News {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("int", { name: "type" })
  type: number;

  @Column("timestamp", {
    name: "create_time",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  create_time: Date | null;

  @Column("timestamp", {
    name: "update_time",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  update_time: Date | null;

  @Column("varchar", { name: "src", nullable: true, length: 255 })
  src: string | null;

  @Column("longtext", { name: "content", nullable: true })
  content: string | null;

  @Column("varchar", { name: "author", nullable: true, length: 255 })
  author: string | null;

  @Column("int", { name: "is_del", default: () => "'0'" })
  is_del: number;

  @Column("int", { name: "home_id", default: () => "'0'" })
  home_id: number;
}
