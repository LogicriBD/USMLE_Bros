import { Content, ContentMetaData } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class ContentFetchAll implements Action<ContentMetaData[]> {
  async execute(): Promise<ContentMetaData[]> {
    try {
      const contents: ContentMetaData[] = await Content.fetchAllMetadata();
      return contents;
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
