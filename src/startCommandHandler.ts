import type { Context } from 'grammy';

const getCommand = (text: string) => text.split(' ')[0] as '/start' | '/help';

export const startCommandHandler = async (ctx: Context): Promise<void> => {
  try {
    await ctx.reply(
      'Hi! This bot converts channel post comments to Excel file.\n\nUsage:\n\n- send post to bot\n\n- or send copied post link to bot',
    );
  } catch (err) {
    if (ctx.message && ctx.message.text) {
      console.error(
        `Failed to handle ${getCommand(ctx.message.text)} command`,
        err,
      );
    }

    await ctx.reply('Sorry, something went wrong');
  }
};
