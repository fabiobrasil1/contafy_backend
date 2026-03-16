import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reconciliation, FileType } from "./entities/reconciliation.entity";
import { CreateReconciliationDto } from "./dto";
import * as fs from "fs";
import * as path from "path";

const ALLOWED_EXTENSIONS: FileType[] = ["pdf", "csv", "ofx"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

@Injectable()
export class ReconciliationService {
  constructor(
    @InjectRepository(Reconciliation)
    private readonly repo: Repository<Reconciliation>,
  ) {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
  }

  async findAll(): Promise<Reconciliation[]> {
    return this.repo.find({ order: { createdAt: "DESC" } });
  }

  async findOne(id: string): Promise<Reconciliation> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Conciliação ${id} não encontrada`);
    }
    return item;
  }

  async create(
    dto: CreateReconciliationDto,
    file: Express.Multer.File,
  ): Promise<Reconciliation> {
    if (!file) {
      throw new BadRequestException("Arquivo do extrato é obrigatório");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException("Arquivo deve ter no máximo 10 MB");
    }

    const ext = file.originalname
      .split(".")
      .pop()
      ?.toLowerCase() as FileType | undefined;

    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      throw new BadRequestException(
        "Formatos permitidos: PDF, CSV, OFX",
      );
    }

    const savedName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(UPLOADS_DIR, savedName);
    fs.writeFileSync(filePath, file.buffer);

    const entity = this.repo.create({
      accountName: dto.accountName,
      bankName: dto.bankName,
      statementDate: dto.statementDate,
      description: dto.description ?? "",
      fileName: file.originalname,
      fileType: ext,
    });

    return this.repo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
