import type { Context } from 'grammy';
import type { Peer, MsgId } from './types';
import { replyWithExcel } from './replyWithExcel';

const getDataFromUrl = (url: string): { peer: Peer; msgId: MsgId } => {
  const { pathname } = new URL(url);

  const [peer, msgId] = pathname.split('/').slice(-2);

  return {
    peer: pathname.startsWith('/c/') ? parseInt(`-100${peer}`, 10) : peer,
    msgId: parseInt(msgId, 10),
  };
};

export const pasteUrlMessageHandler = async (ctx: Context) => {
  try {
    if (!ctx.message || !ctx.message.text) return;

    const { peer, msgId } = getDataFromUrl(ctx.message.text);

    await replyWithExcel(peer, msgId, ctx);
  } catch (err) {
    console.error(`Failed to handle message:entities:url message`, err);

    await ctx.reply(`Error: ${(err as Error).message}`);
  }
};
