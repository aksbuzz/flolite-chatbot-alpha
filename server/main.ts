import cors from '@fastify/cors';
import fastify from 'fastify';
import OpenAI from 'openai';
import { callExternalAPI } from './api';
import { chatCompletionRequest } from './lib/openai';
import { tools } from './tools';

// Messages to keep track of user and assistant
const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content:
      "Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous.",
  },
];

const server = fastify();
server.register(cors, { origin: 'http://localhost:5173' });

// ROUTES
server.get<{}>('/ping', async () => 'pong\n');
server.post<{ Body: { message: string } }>('/api/chat', async (request, reply) => {
  // Get user query from request and append to messages array
  const query = request.body.message;
  messages.push({ role: 'user', content: query });

  // send user query to openai and append to messages array
  let chatResponse = await chatCompletionRequest(messages, tools);
  let assistantMsg = chatResponse.message;
  messages.push(assistantMsg);

  // check if assistant response is a tool call
  if (
    assistantMsg.content === null &&
    assistantMsg.tool_calls &&
    assistantMsg.role === 'assistant'
  ) {
    // call external API
    const toolCall = assistantMsg.tool_calls![0];
    const apiResponse = await callExternalAPI(toolCall);
    messages.push({ role: 'tool', content: apiResponse, tool_call_id: toolCall.id });

    // send tool response to openai
    chatResponse = await chatCompletionRequest(messages, tools, 'none');
    assistantMsg = chatResponse.message;
  }

  reply.send({ data: assistantMsg.content }).status(200);
});

server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
