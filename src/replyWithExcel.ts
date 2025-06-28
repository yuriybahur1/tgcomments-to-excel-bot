import { InputFile } from 'grammy';
import type { Context } from 'grammy';
import type { Peer, MsgId } from './types';
import { fetchReplies } from './fetchReplies';
import { fetchComments } from './fetchComments';
import { getExcelBuffer } from './getExcelBuffer';

export const replyWithExcel = async (
  peer: Peer,
  msgId: MsgId,
  ctx: Context,
): Promise<void> => {
  const loadingMsg = await ctx.reply('Loading...');

  try {
    const replies = await fetchReplies(peer, msgId);

    const comments = fetchComments(replies);

    const excelBuffer = getExcelBuffer(comments);

    await ctx.replyWithDocument(new InputFile(excelBuffer, 'comments.xlsx'));
  } catch (err) {
    console.error('Error fetching comments or writing to Excel:', err);

    throw err;
  } finally {
    await ctx.api.deleteMessage(loadingMsg.chat.id, loadingMsg.message_id);
  }
};
