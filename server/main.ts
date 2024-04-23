import cors from '@fastify/cors';
import fastify from 'fastify';
import OpenAI from 'openai';
import { callExternalAPI } from './api';
import { openai } from './lib/openai';
import { tools } from './tools';
import { Readable } from 'stream';

function getContext(question: string): OpenAI.Chat.ChatCompletionMessageParam[] {
  return [
    { role: 'user', content: question },
    {
      role: 'system',
      content: 'You are a `flolite` chatbot. ',
    },
  ];
}

async function callOpenAIWithTools(ctx: OpenAI.Chat.ChatCompletionMessageParam[]) {
  const { choices } = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: ctx,
    tools: tools,
    tool_choice: 'auto',
  });

  return choices[0];
}

async function summarizeWithOpenAI(context: OpenAI.Chat.ChatCompletionMessageParam[]) {
  const summary = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: context,
  });

  // TODO: add streaming
  // for await (const chunk of summary) {
  //   process.stdout.write(chunk.choices[0].delta.content || '');
  // }

  return summary.choices[0].message.content;
}

const server = fastify();
server.register(cors, { origin: 'http://localhost:5173' });

server.get('/ping', async () => 'pong\n');

server.post<{ Body: { message: string } }>('/api/chat', async (request, reply) => {
  const question = request.body.message;

  const context = getContext(question);
  try {
    const choice = await callOpenAIWithTools(context);
    if (choice.finish_reason === 'tool_calls') {
      console.log('Tool call');
      const toolCall = choice.message.tool_calls![0];
      const apiResponse = await callExternalAPI(toolCall);

      context.push(choice.message);
      context.push({ role: 'tool', content: apiResponse, tool_call_id: toolCall.id });
      const response = await summarizeWithOpenAI(context);

      reply.send({ data: response }).status(200);
    } else {
      console.log('No tool call');
      reply.send({ data: "Sorry, I didn't understand that." }).status(200);
    }
  } catch (error) {
    console.error(error);
    reply.send({ data: 'There was an error. Please try again.' }).status(500);
  }
});

server.post('/', async (request, reply) => {
  const readableStream = new Readable();
  readableStream._read = () => {};

  reply.header('Content-Type', 'application/json; charset=utf-8');
  reply.send(readableStream);

  // Simulate asynchronous processing of the request
  setTimeout(() => {
    // Push the desired data down the stream
    readableStream.push(JSON.stringify({ message: 'Hello, world!' }));
  }, 1000);

  // Nothing else to do after 5 seconds so we close the stream
  setTimeout(() => {
    // Push the desired data down the stream
    readableStream.push(null); // End the stream when the client closes the connection
  }, 5000);

  return reply;
});

server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
