const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
// const { agent } = require('./lib/openai');

const port = 3000;
const openai = new OpenAI({ apiKey: '' });

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

const messages = [
  {
    role: 'system',
    content: `Given a command or request from user, call one of your functions to complete the request.
      Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous.
      If the request cannot be completed by your available functions, call rejectRequest function.
      You can reply to greetings from user.
      `,
  },
];

app.post('/', async (req, res) => {
  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Where am I located?' }],
    stream: true,
    tools: [
      {
        type: 'function',
        function: {
          name: 'getLocation',
          description: "Get the user's location based on their IP address",
          parameters: {
            type: 'object',
            properties: {},
          },
        },
      },
    ],
  });

  for await (const part of stream) {
    if (part.choices[0].finish_reason === 'stop') {
      res.end();
      return;
    }
    console.log(part.choices[0]?.delta);
    res.write(part.choices[0]?.delta?.content || '');
  }
});

// app.post('/chat', async (req, res) => {
//   const query = req.body.message;
//   messages.push({ role: 'user', content: query });

//   let chatResponse = await agent(messages, tools);

//   const collectedMessages = [];
//   for await (const part of chatResponse) {
//     if (part.choices[0].finish_reason === 'stop') {
//       res.end();
//       return;
//     }
//     const result = part.choices[0]?.delta?.content || '';
//     collectedMessages.push(result);

//     res.write({ data: result });
//   }
//   messages.push({ role: 'assistant', content: collectedMessages.join('') });

//   let assistantMsg = chatResponse.message;
//   messages.push(assistantMsg);

//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: 'Write paragraph in 200 words' }],
//   });

//   console.log(response.choices[0].message.content);

//   res.write(response.choices[0].message.content);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
