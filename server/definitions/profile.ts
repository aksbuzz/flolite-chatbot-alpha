import OpenAI from 'openai';

export const profileTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'getMyProfile',
      description:
        'Gets the user profile which includes information about user. Also gets user role.',
    },
  },
];
