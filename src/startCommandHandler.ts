import type { Context } from 'grammy';

const getCommand = (text: string) => text.split(' ')[0] as '/start' | '/help';

export const startCommandHandler = async (ctx: Context): Promise<void> => {
  try {
    await ctx.reply(
      'Привіт! Цей бот конвертує коментарі постів в Excel файли.\n\nВикористання:\n\n- надішли пост боту\n\n- або надішли скопійоване посилання поста боту',
    );
  } catch (err) {
    if (ctx.message && ctx.message.text) {
      console.error(
        `Failed to handle ${getCommand(ctx.message.text)} command`,
        err,
      );
    }

    await ctx.reply(`Error: ${(err as Error).message}`);
  }
};
