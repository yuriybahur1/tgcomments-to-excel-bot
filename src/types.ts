import { Api } from 'telegram';

export interface Replies {
  messages: Api.Message[];
  users: Api.User[];
  chats: Api.Channel[];
}

export interface Comment {
  fullName: string;
  username: string | undefined;
  message: string;
  date: string;
}

export type Peer = string | number;

export type MsgId = number;
