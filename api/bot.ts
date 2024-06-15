import 'dotenv/config';
import { Bot } from 'grammy';
import { checkEnvVars } from '../src/checkEnvVars';
import { startCommandHandler } from '../src/startCommandHandler';
import { longPollingErrorHandler } from '../src/longPollingErrorHandler';
import { forwardOriginMessageHandler } from '../src/forwardOriginMessageHandler';
import { pasteUrlMessageHandler } from '../src/pasteUrlMessageHandler';
import { webhookHandler } from '../src/webhookHandler';

checkEnvVars();

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command(['start', 'help'], startCommandHandler);

bot.on('message:forward_origin:channel', forwardOriginMessageHandler);

bot.on('message:entities:url', pasteUrlMessageHandler);

if (process.env.NODE_ENV === 'development') {
  bot.catch(longPollingErrorHandler);

  console.log('Bot started...');

  void bot.start();
}

export default webhookHandler(bot);
