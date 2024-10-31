import { ContentData } from "@/database/repository/Content";

export interface ContentDataWithTitle extends ContentData {
  title?: string;
}

export interface ISection {
  id?: string;
  section: string;
  locked: boolean;
  sections?: ISection[];
}
export interface ContentAllData {
  metadataTitle: string;
  username: string;
  createdAt: Date | null;
  contentDataWithTitle: ContentDataWithTitle[];
}