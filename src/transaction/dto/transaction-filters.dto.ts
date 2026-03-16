import { IsOptional, IsString, IsIn, IsDateString, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class TransactionFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  accountName?: string;

  @IsOptional()
  @IsIn(["credit", "debit", "transfer"])
  type?: "credit" | "debit" | "transfer";

  @IsOptional()
  @IsIn(["completed", "pending", "cancelled"])
  status?: "completed" | "pending" | "cancelled";

  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}
