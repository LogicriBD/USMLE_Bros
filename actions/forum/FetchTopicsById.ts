import { Topic, TopicType } from "@/database/repository/Topic";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class FetchTopicsById implements Action<{ topics: TopicType; subTopics: TopicType[] }> {
    constructor(private id: string) {}

    async execute(): Promise<{ topics: TopicType; subTopics: TopicType[] }> {
        try {
            const { topic, subTopics }: { topic: TopicType; subTopics: TopicType[] } = await Topic.fetchTopicAndSubTopicsById(this.id);
            return { topics: topic, subTopics };
        } catch (error) {
            logger.error("Error fetching topic and subtopics:", error);
            return { topics: {} as TopicType, subTopics: [] as TopicType[] };
        }
    }
}