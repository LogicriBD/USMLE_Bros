import { EmailMessage } from "@/types/Email";
import { PrettifyEmail } from "../PrettifyEmail";
import { firestore } from "@/database/config/adminApp";

export class Newsletter implements EmailMessage {
  private subject: string;
  private message: string;

  constructor(subject: string, message: string) {
    this.subject = subject;
    this.message = message;
  }

  async getRecipients(): Promise<string[]> {
    const user = firestore.collection("users");
    const userSnapshot = await user.get();
    if (userSnapshot.empty) {
      throw Error("No users found");
    }
    const emails = userSnapshot.docs.map((doc) => doc.data().email);
    return emails;
  }

  getSubject(): string {
    return this.subject;
  }

  getMessage(): string {
    return PrettifyEmail.template(this.subject, this.message);
  }
}
