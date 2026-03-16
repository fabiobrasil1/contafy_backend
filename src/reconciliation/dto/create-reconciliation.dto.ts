import { IsNotEmpty, IsString, IsOptional, IsDateString } from "class-validator";

export class CreateReconciliationDto {
  @IsNotEmpty({ message: "Nome da conta é obrigatório" })
  @IsString()
  accountName: string;

  @IsNotEmpty({ message: "Nome do banco é obrigatório" })
  @IsString()
  bankName: string;

  @IsNotEmpty({ message: "Data do extrato é obrigatória" })
  @IsDateString({}, { message: "Data do extrato deve ser uma data válida" })
  statementDate: string;

  @IsOptional()
  @IsString()
  description?: string;
}
