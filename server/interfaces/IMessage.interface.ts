export interface IMessage {
    id: number;
    message: string;
    subject: string;
    sender_id: string;
    receiver_id: string;
    date: Date;
}
