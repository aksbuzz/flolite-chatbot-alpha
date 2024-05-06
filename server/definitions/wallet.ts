import OpenAI from 'openai';

export const walletTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'getLeaderboard',
      description: 'Gets the leaderboard of users. By default type will be monthly.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['monthly', 'yearly', 'quarterly'],
            default: 'monthly',
          },
        },
        required: ['type'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getCoinSystem',
      description:
        'Gets the coin system. It shows how much coin we can earn from different modules.',
    },
  },
];
