import type { Context } from 'grammy';
import { replyWithExcel } from './replyWithExcel';

// previousMediaGroupId added to prevent bug with media groups when comments not fetched correctly
let previousMediaGroupId = '';

export const forwardOriginMessageHandler = async (
  ctx: Context,
): Promise<void> => {
  try {
    if (!ctx.message) return;

    const { forward_origin, media_group_id } = ctx.message;

    if (!forward_origin || forward_origin.type !== 'channel') return;

    if (media_group_id) {
      if (media_group_id !== previousMediaGroupId) {
        previousMediaGroupId = media_group_id;
      } else {
        return;
      }
    }

    await replyWithExcel(
      forward_origin.chat.id,
      forward_origin.message_id,
      ctx,
    );
  } catch (err) {
    await ctx.reply('Sorry, something went wrong');
  }
};
