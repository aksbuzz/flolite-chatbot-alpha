import OpenAI from 'openai';
import {
  getAnnouncements,
  getCoinBalance,
  getPendingTasks,
  getUpcomingEvents,
} from './dashboard/dashboard';
import { submitAnonymousFeedback } from './feedback/feedback';
import { getAboutFlolite } from './flolite';
import { getMyProfile } from './profile/profile';
import { getMyTeam } from './team/team';
import { getCoinSystem, getLeaderboard } from './wallet/wallet';

export async function callExternalAPI(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall
) {
  let result;
  const { name: toolName, arguments: toolArgs } = toolCall.function;
  const parsedArgs = JSON.parse(toolArgs);
  try {
    switch (toolName) {
      case 'getCoinBalance':
        result = await getCoinBalance();
        break;
      case 'getAnnouncements':
        result = await getAnnouncements();
        break;
      case 'getPendingTasks':
        result = await getPendingTasks();
        break;
      case 'getUpcomingEvents':
        result = await getUpcomingEvents();
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
      case 'getAboutFlolite':
        result = await getAboutFlolite();
        break;
      case 'getMyTeam':
        result = await getMyTeam(parsedArgs);
        break;
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }

    return JSON.stringify(result);
  } catch (error) {
    throw new Error(`API request failed for ${toolName}: ${error}}`);
  }
}
