import { BotError, GrammyError, HttpError } from 'grammy';

export const longPollingErrorHandler = async (err: BotError): Promise<void> => {
  const ctx = err.ctx;

  console.error(
    `Error while handling update ${ctx.update.update_id.toString()}:`,
    err.error,
  );

  if (err.error instanceof GrammyError) {
    await ctx.reply('An error occurred while processing your request.');
  } else if (err.error instanceof HttpError) {
    await ctx.reply('There was an HTTP error while processing your request.');
  } else {
    await ctx.reply('An unexpected error occurred.');
  }
};
