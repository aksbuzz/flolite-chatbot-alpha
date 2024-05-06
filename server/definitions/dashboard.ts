import OpenAI from 'openai';

export const dashboardTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
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
      name: 'getUpcomingEvents',
      description:
        'Gets all upcoming events (holidays, birthdays, work anniversaries) in organization.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'getPendingTasks',
      description: 'Gets all pending tasks for a user',
    },
  },
];
