import OpenAI from 'openai';
import {
  getAnnouncements,
  getCoinBalance,
  getUpcomingBirthdays,
  getUpcomingHolidays,
  getUpcomingWorkAnniversaries,
} from './dashboard/dashboard';
import { getMyProfile } from './profile/profile';
import { getCoinSystem, getLeaderboard } from './wallet/wallet';
import { submitAnonymousFeedback } from './feedback/feedback';

export async function callExternalAPI(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall
) {
  let result;
  const { name: toolName, arguments: toolArgs } = toolCall.function;
  const parsedArgs = JSON.parse(toolArgs);

  switch (toolName) {
    case 'getCoinBalance':
      result = await getCoinBalance();
      break;
    case 'getAnnouncements':
      result = await getAnnouncements();
      break;
    case 'getUpcomingHolidays':
      result = await getUpcomingHolidays();
      break;
    case 'getUpcomingBirthdays':
      result = await getUpcomingBirthdays();
      break;
    case 'getUpcomingWorkAnniversaries':
      result = await getUpcomingWorkAnniversaries();
      break;
    case 'getMyProfile':
      result = await getMyProfile();
      break;
    case 'getLeaderboard':
      result = await getLeaderboard(parsedArgs);
      break;
    case 'getCoinSystem':
      result = await getCoinSystem();
      break;
    case 'submitAnonymousFeedback':
      result = await submitAnonymousFeedback(parsedArgs);
      break;
    default:
      // TODO: replace
      throw new Error(`Unknown tool: ${toolName}`);
  }

  return JSON.stringify(result);
}
