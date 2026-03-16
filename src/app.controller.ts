import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      name: "Contafy API",
      version: "0.1.0",
      status: "ok",
    };
  }

  @Get("health")
  health() {
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
