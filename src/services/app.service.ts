import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async canIDeploy(date: Date): Promise<boolean> {
    return date.getDay() === 5;
  }
}
