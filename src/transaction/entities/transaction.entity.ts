import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export type TransactionType = "credit" | "debit" | "transfer";
export type TransactionStatus = "completed" | "pending" | "cancelled";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  amount: number;

  @Column({ name: "account_name" })
  accountName: string;

  @Column({ length: 20 })
  type: TransactionType;

  @Column({ length: 20, default: "pending" })
  status: TransactionStatus;

  @Column({ nullable: true })
  category: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
