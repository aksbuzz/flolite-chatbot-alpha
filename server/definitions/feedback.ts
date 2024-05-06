import OpenAI from 'openai';

export const feedbackTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'submitAnonymousFeedback',
      description: 'Submits anonymous feedback. Please prompt user to provide feedback data',
      parameters: {
        type: 'object',
        properties: { feedback_data: { type: 'string' } },
        required: ['feedback_data'],
      },
    },
  },
];
