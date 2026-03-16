import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "./entities/transaction.entity";

const SEED_DATA: Partial<Transaction>[] = [
  {
    date: "2024-03-10",
    description: "Pagamento fornecedor ABC",
    amount: -1500.0,
    accountName: "Conta Corrente Principal",
    type: "debit",
    status: "completed",
    category: "Fornecedores",
  },
  {
    date: "2024-03-09",
    description: "Depósito cliente XYZ",
    amount: 3200.5,
    accountName: "Conta Corrente Principal",
    type: "credit",
    status: "completed",
    category: "Receita",
  },
  {
    date: "2024-03-08",
    description: "Transferência PIX",
    amount: -250.0,
    accountName: "Conta Empresa",
    type: "transfer",
    status: "pending",
    category: "Transferência",
  },
  {
    date: "2024-03-07",
    description: "Tarifa mensal",
    amount: -45.9,
    accountName: "Conta Corrente Principal",
    type: "debit",
    status: "completed",
    category: "Tarifas",
  },
  {
    date: "2024-03-06",
    description: "Venda produto A",
    amount: 890.0,
    accountName: "Conta Empresa",
    type: "credit",
    status: "completed",
    category: "Receita",
  },
  {
    date: "2024-03-05",
    description: "Compra material",
    amount: -1200.0,
    accountName: "Conta Corrente Principal",
    type: "debit",
    status: "cancelled",
    category: "Compras",
  },
  {
    date: "2024-03-04",
    description: "TED recebido",
    amount: 5000.0,
    accountName: "Conta Empresa",
    type: "credit",
    status: "completed",
    category: "Receita",
  },
  {
    date: "2024-03-03",
    description: "Pagamento boleto",
    amount: -380.5,
    accountName: "Conta Corrente Principal",
    type: "debit",
    status: "completed",
    category: "Contas a pagar",
  },
];

@Injectable()
export class TransactionSeedService implements OnModuleInit {
  private readonly logger = new Logger(TransactionSeedService.name);

  constructor(
    @InjectRepository(Transaction)
    private readonly repo: Repository<Transaction>,
  ) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count > 0) return;

    this.logger.log("Seeding transactions...");
    const entities = this.repo.create(SEED_DATA);
    await this.repo.save(entities);
    this.logger.log(`Seeded ${entities.length} transactions`);
  }
}
