import { Content, ContentMetaData } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class ContentFetchMetadataById
  implements Action<ContentMetaData | undefined>
{
  constructor(private metadataId: string) {}

  async execute(): Promise<ContentMetaData | undefined> {
    try {
      const content = await Content.fetchMetadataById(this.metadataId);
      return content;
    } catch (error: any) {
      logger.error(error);
    }
  }
}
