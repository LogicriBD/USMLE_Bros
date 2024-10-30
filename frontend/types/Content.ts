import { ContentData } from "@/database/repository/Content";

export interface ContentDataWithTitle extends ContentData {
  title?: string;
}

export interface ISection {
  section: string;
  locked: boolean;
  sections?: ISection[];
}
