import type { Replies, Comment } from './types';
import { formatDate } from './formatDate';
import { getFullName } from './getFullName';
import { getEditedStatus } from './getEditedStatus';

export const fetchComments = (replies: Replies): Comment[] => {
  const comments = replies.messages.reduce<Comment[]>((prev, cur) => {
    if (cur.message === '') return prev;

    const message = cur.message;

    const date = formatDate(cur.date, 'uk-UA');

    if (cur.fromId && cur.fromId.className === 'PeerUser') {
      const userId = cur.fromId.userId;

      const user = replies.users.find((u) => u.id.eq(userId));

      if (!user) return prev;

      return [
        ...prev,
        {
          fullName: getFullName(user),
          username: user.username,
          message,
          date,
          edited: getEditedStatus(cur.editDate, cur.editHide),
        },
      ];
    }

    if (cur.fromId && cur.fromId.className === 'PeerChannel') {
      const channelId = cur.fromId.channelId;

      const channel = replies.chats.find((c) => c.id.eq(channelId));

      if (!channel) return prev;

      return [
        ...prev,
        {
          fullName: channel.title,
          username: channel.username,
          message,
          date,
          edited: getEditedStatus(cur.editDate, cur.editHide),
        },
      ];
    }

    // eslint-disable-next-line
    if (cur.fromId && cur.fromId.className === 'PeerChat') {
      const chatId = cur.fromId.chatId;

      const chat = replies.chats.find((v) => v.id.eq(chatId));

      if (!chat) return prev;

      return [
        ...prev,
        {
          fullName: chat.title,
          username: undefined,
          message,
          date,
          edited: getEditedStatus(cur.editDate, cur.editHide),
        },
      ];
    }

    return prev;
  }, []);

  return comments.reverse();
};
