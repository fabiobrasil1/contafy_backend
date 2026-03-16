import {
  Controller,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionFiltersDto } from "./dto";

@Controller("transactions")
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Get()
  findAll(@Query() filters: TransactionFiltersDto) {
    return this.service.findAll(filters);
  }

  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }
}
