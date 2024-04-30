import OpenAI, { OpenAI as OpenAIClass } from 'openai';
import { config } from '../config';

export const openai = new OpenAIClass({ apiKey: config.OPENAI_API_KEY });

export async function chatCompletionRequest(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  tools: OpenAI.Chat.Completions.ChatCompletionTool[],
  tool_choice: OpenAI.Chat.Completions.ChatCompletionToolChoiceOption = 'auto'
) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      tools,
      tool_choice,
    });

    return response.choices[0];
  } catch (error) {
    console.log(error);
    throw new Error('Unable to generate Chat completion response');
  }
}
