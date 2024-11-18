import { Blog, BlogRepo } from "@/database/repository/Blog";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class createBlog implements Action<void> {
  constructor(private payload: {blog:Blog}) {}

  async execute() {
    try {
      await BlogRepo.createBlog(this.payload.blog);
    } catch (error: any) {
      logger.log(error);
    }
  }
}