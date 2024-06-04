import { Api } from 'telegram';

export type Replies = {
  messages: Api.Message[];
  users: Api.User[];
  chats: Api.Channel[];
};

export type Comment = {
  fullName: string;
  username: string | undefined;
  message: string;
  date: string;
};

export type Peer = string | number;

export type MsgId = number;
