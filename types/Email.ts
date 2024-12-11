export interface EmailMessage {
  getRecipients: () => Promise<string[]>;
  getSubject: () => string;
  getMessage: () => string;
}
