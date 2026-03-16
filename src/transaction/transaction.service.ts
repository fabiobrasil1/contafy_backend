import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Transaction } from "./entities/transaction.entity";
import { TransactionFiltersDto } from "./dto";

export interface TransactionsResponse {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repo: Repository<Transaction>,
  ) {}

  async findAll(filters: TransactionFiltersDto): Promise<TransactionsResponse> {
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 10;

    const qb: SelectQueryBuilder<Transaction> = this.repo
      .createQueryBuilder("t")
      .orderBy("t.date", "DESC")
      .addOrderBy("t.created_at", "DESC");

    if (filters.search?.trim()) {
      const q = `%${filters.search.trim().toLowerCase()}%`;
      qb.andWhere(
        "(LOWER(t.description) LIKE :q OR LOWER(t.account_name) LIKE :q OR LOWER(t.category) LIKE :q)",
        { q },
      );
    }

    if (filters.accountName) {
      qb.andWhere("t.account_name = :accountName", {
        accountName: filters.accountName,
      });
    }

    if (filters.type) {
      qb.andWhere("t.type = :type", { type: filters.type });
    }

    if (filters.status) {
      qb.andWhere("t.status = :status", { status: filters.status });
    }

    if (filters.dateFrom) {
      qb.andWhere("t.date >= :dateFrom", { dateFrom: filters.dateFrom });
    }

    if (filters.dateTo) {
      qb.andWhere("t.date <= :dateTo", { dateTo: filters.dateTo });
    }

    const total = await qb.getCount();

    const data = await qb
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return { data, total, page, pageSize };
  }

  async findOne(id: string): Promise<Transaction> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Transação ${id} não encontrada`);
    }
    return item;
  }
}
