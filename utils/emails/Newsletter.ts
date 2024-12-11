import { EmailMessage } from "@/types/Email";
import { PrettifyEmail } from "../PrettifyEmail";
import { firestore } from "@/database/config/adminApp";
import { Roles } from "../enums/Roles";

export class Newsletter implements EmailMessage {
  private subject: string;
  private message: string;
  private receiver: string;

  constructor(subject: string, message: string, receiver: string) {
    this.subject = subject;
    this.message = message;
    this.receiver = receiver;
  }

  async getRecipients(): Promise<string[]> {
    let user: any;
    if (this.receiver === Roles.Admin) {
      user = firestore.collection("users").where("role", "==", Roles.Admin);
    } else if (this.receiver === Roles.User) {
      user = firestore.collection("users").where("role", "==", Roles.User);
    } else {
      user = firestore.collection("users");
    }
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
