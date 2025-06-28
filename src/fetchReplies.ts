import { TelegramClient, Api } from 'telegram';
import { StringSession } from 'telegram/sessions';
import type { Peer, MsgId, Replies } from './types';

export const fetchReplies = async (
  peer: Peer,
  msgId: MsgId,
): Promise<Replies> => {
  const apiClient = new TelegramClient(
    new StringSession(process.env.SESSION!),
    parseInt(process.env.API_ID!, 10),
    process.env.API_HASH!,
    {},
  );

  try {
    await apiClient.connect();

    const replies: Replies = {
      messages: [],
      users: [],
      chats: [],
    };

    let hasMoreReplies = true;

    let offsetId = 0;

    while (hasMoreReplies) {
      const res = (await apiClient.invoke(
        new Api.messages.GetReplies({
          peer,
          msgId,
          offsetId,
          offsetDate: 0,
          addOffset: 0,
          limit: 100,
          maxId: 0,
          minId: 0,
          // eslint-disable-next-line
          // @ts-ignore
          hash: 0,
        }),
      )) as Api.messages.ChannelMessages;

      if (res.messages.length > 0) {
        replies.messages.push(...(res.messages as Api.Message[]));

        replies.users.push(...(res.users as Api.User[]));

        replies.chats.push(...(res.chats as Api.Channel[]));

        offsetId = res.messages[res.messages.length - 1].id;

        if (process.env.NODE_ENV === 'development') {
          await new Promise((r) => setTimeout(r, 1500));
        }
      } else {
        hasMoreReplies = false;
      }
    }

    return replies;
  } catch (err) {
    console.error('Error fetching replies:', err);

    throw err;
  } finally {
    await apiClient.disconnect();
  }
};
