import { Bot, webhookCallback } from 'grammy';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const webhookHandler = (bot: Bot) => {
  if (process.env.NODE_ENV !== 'production') return;

  return async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    try {
      await webhookCallback(bot, 'http')(req, res);
    } catch (err) {
      console.error('Error in webhook handler:', err);

      res.status(500).send('Internal Server Error');
    }
  };
};
