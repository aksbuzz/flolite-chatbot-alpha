const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: '' });

export async function agent(messages, tools, tool_choice) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      tools,
      tool_choice,
      stream: true,
    });

    return stream;
  } catch (error) {
    console.log(error);
    throw new Error('Unable to generate Chat completion response');
  }
}
