export type SendMessage = {
    text: string;
    userId: string;
    userName: string;
    time: Date | string; 
}

export type ReceiveMessage = SendMessage & {
    id: string;
}