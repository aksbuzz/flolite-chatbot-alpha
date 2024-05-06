import OpenAI from 'openai';

export const floliteTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'getAboutFlolite',
      description:
        'What is Flolite? How does it work? What are the benefits of using Flolite?',
    },
  }
];
