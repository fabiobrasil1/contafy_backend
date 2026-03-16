import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export type FileType = "pdf" | "csv" | "ofx";

@Entity("reconciliations")
export class Reconciliation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "account_name" })
  accountName: string;

  @Column({ name: "bank_name" })
  bankName: string;

  @Column({ name: "statement_date", type: "date" })
  statementDate: string;

  @Column({ default: "" })
  description: string;

  @Column({ name: "file_name" })
  fileName: string;

  @Column({ name: "file_type", length: 10 })
  fileType: FileType;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
