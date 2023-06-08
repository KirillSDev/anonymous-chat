export interface IMessage {
    id: number;
    message: string;
    subject: string;
    sender_id: string;
    receiver_id: string;
    sender: ISender;
    date: string;
}

interface ISender {
    name: string;
}
