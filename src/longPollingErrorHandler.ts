import { BotError, Context, GrammyError, HttpError } from 'grammy';

export const longPollingErrorHandler = (err: BotError<Context>): void => {
  const ctx = err.ctx;

  console.error(
    `Error while handling update ${ctx.update.update_id}:`,
    err.error,
  );

  if (err.error instanceof GrammyError) {
    ctx.reply('An error occurred while processing your request.');
  } else if (err.error instanceof HttpError) {
    ctx.reply('There was an HTTP error while processing your request.');
  } else {
    ctx.reply('An unexpected error occurred.');
  }
};
