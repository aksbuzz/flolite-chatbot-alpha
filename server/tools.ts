import OpenAI from 'openai';

export const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'getCoinBalance',
      description:
        'Gets the current balance and lifetime earnings of the user. It also gets last 10 transactions.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'getAnnouncements',
      description: 'Gets all published announcements within the organization.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'getUpcomingHolidays',
      description: 'Gets upcoming holidays within the organization.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'getUpcomingBirthdays',
      description: 'Gets upcoming birthdays within the organization.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'getUpcomingWorkAnniversaries',
      description: 'Gets upcoming work anniversaries within the organization.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'getMyProfile',
      description:
        'Gets the user profile which includes information about user. Also gets user role.',
    },
  },
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
