import { Column, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "@midwayjs/orm";

@EntityModel("productCategory", { schema: "hongrunxing" })
export class ProductCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

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

  @Column("int", { name: "is_del", default: () => "'0'" })
  is_del: number;

  @Column("varchar", { name: "type", nullable: true, length: 255 })
  type: string | null;
}