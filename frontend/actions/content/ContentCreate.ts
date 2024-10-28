import { Content } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class ContentCreate implements Action<void> {
  constructor(private payload: { content: Content }) {}
  async execute(): Promise<void> {
    try {
      await Content.createContent(this.payload.content);
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
