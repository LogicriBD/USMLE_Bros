import { User, UserData } from "@/database/repository/User";
import { routes } from "@/src/api/Routes";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class SendNewsLetter implements Action<void> {
    constructor(private subject: string, private receiver: string, private content: string) { }

    async execute(): Promise<void> {
        const users = await this.fetchUsers();
        await Promise.all(
            users.map(async (user) => {
                if (user.email) {
                    return this.sendEmail(user.email);
                }
            })
        );
    }

    private async fetchUsers(): Promise<UserData[]> {
        try {
            let users: UserData[] = [];
            if (this.receiver === "All") {
                users = await User.findAllUsers();
            } else {
                users = await User.findUsersByRole(this.receiver);
            }

            return users;
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    private async sendEmail(email: string): Promise<void> {
        try {
            const response = await fetch(routes.mail.send, {
                method: 'POST',
                body: JSON.stringify({
                    message: this.content,
                    receiver: email,
                    subject: this.subject,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                logger.log(`Failed to process email: ${email}`);
            }
        } catch (error: any) {
            logger.error(error.message);
        }
    }
}

