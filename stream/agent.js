const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: '' });

async function getLocation() {
  const response = await fetch('https://ipapi.co/json/');
  const locationData = await response.json();

  return locationData;
}

async function getCurrentWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
  const response = await fetch(url);
  const weatherData = await response.json();
  return weatherData;
}

const availableTools = {
  getCurrentWeather,
  getLocation,
};

const tools = [
  {
    type: 'function',
    function: {
      name: 'getCurrentWeather',
      description: 'Get the current weather in a given location',
      parameters: {
        type: 'object',
        properties: {
          latitude: {
            type: 'string',
          },
          longitude: {
            type: 'string',
          },
        },
        required: ['longitude', 'latitude'],
      },
    },
  },
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
];

const messages = [
  {
    role: 'system',
    content: 'You are a helpful assistant. Only use the functions you have been provided with.',
  },
];

async function agent(userInput) {
  messages.push({ role: 'user', content: userInput });
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    tools,
  });

  const { finish_reason, message } = response.choices[0];

  if (finish_reason === 'tool_calls' && message.tool_calls) {
    const functionToCall = availableTools[message.tool_calls[0].function.name];
    const functionArgs = JSON.parse(message.tool_calls[0].function.arguments);

    const functionResponse = await functionToCall.apply(null, Object.values(functionArgs));
    console.log(functionResponse);
  }

  console.log(response);
}

agent('Where am I located right now?');
