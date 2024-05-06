import OpenAI from 'openai';
import { dashboardTools } from './definitions/dashboard';
import { feedbackTools } from './definitions/feedback';
import { floliteTools } from './definitions/flolite';
import { profileTools } from './definitions/profile';
import { teamTools } from './definitions/team';
import { walletTools } from './definitions/wallet';

export const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  ...dashboardTools,
  ...feedbackTools,
  ...floliteTools,
  ...profileTools,
  ...teamTools,
  ...walletTools,
  {
    type: 'function',
    function: {
      name: 'rejectRequest',
      description: 'Use this function if the request is not possible.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
];
