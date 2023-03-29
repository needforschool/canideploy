import { Controller, Get } from "@nestjs/common";

import { APIResponse } from "src/common/interfaces/api-response.interface";
import { AppService } from "src/services/app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("canideploy")
  async canIDeploy(): Promise<APIResponse<boolean>> {
    const today = new Date();
    const result: boolean = await this.appService.canIDeploy(today);

    return {
      success: true,
      data: result,
    };
  }
}