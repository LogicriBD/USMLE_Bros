import { Content, ContentData } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class ContentsFetchById implements Action<ContentData[]> {
  constructor(private payload: { metadataId: string; all?: boolean }) {}

  async execute(): Promise<ContentData[]> {
    try {
      const contents = await Content.fetchContentsById(
        this.payload.metadataId,
        this.payload.all === undefined ? false : this.payload.all
      );
      return contents;
    } catch (error: any) {
      logger.error(error);
      return [] as ContentData[];
    }
  }
}
