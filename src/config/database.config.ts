import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME || "contafy",
  password: process.env.DB_PASSWORD || "contafy123",
  database: process.env.DB_DATABASE || "contafy",
}));
