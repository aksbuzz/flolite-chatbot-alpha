import OpenAI from 'openai';

export const teamTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'getMyTeam',
      description:
        'Gets members of my team along with details. Includes my info. Also gets PIP info about member',
      parameters: {
        type: 'object',
        properties: {
          is_deleted: {
            type: 'boolean',
            default: false,
            description: 'Include archive members',
          },
          is_under_pip: {
            type: 'boolean',
            default: false,
            description: 'Include members under PIP',
          },
        },
      },
    },
  },
];
