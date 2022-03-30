import { Column, Index, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "@midwayjs/orm";

@Index("home_id", ["home_id"], {})
@Index("service_id", ["service_id"], {})
@Index("case_id", ["case_id"], {})
@EntityModel("home_images", { schema: "hongrunxing" })
export class HomeImages {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "src", nullable: true, length: 255 })
  src: string | null;

  @Column("timestamp", { name: "create_time", nullable: true })
  create_time: Date | null;

  @Column("timestamp", {
    name: "update_time",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  update_time: Date | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "home_id", nullable: true })
  home_id: number | null;

  @Column("varchar", { name: "desc", nullable: true, length: 255 })
  desc: string | null;

  @Column("int", { name: "service_id", nullable: true })
  service_id: number | null;

  @Column("int", { name: "case_id", nullable: true })
  case_id: number | null;
}
