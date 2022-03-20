import { Column, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "@midwayjs/orm";

@EntityModel("carousel", { schema: "hongrunxing" })
export class Carousel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "path",
    nullable: true,
    comment: "图片路径",
    length: 255,
  })
  path: string | null;

  @Column("int", { name: "is_del", comment: "是否删除", default: () => "'0'" })
  is_del: number;

  @Column("timestamp", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  create_time: Date | null;

  @Column("timestamp", {
    name: "update_time",
    nullable: true,
    comment: "更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  update_time: Date | null;

  @Column("varchar", { name: "type", nullable: true, length: 255 })
  type: string | null;
}
