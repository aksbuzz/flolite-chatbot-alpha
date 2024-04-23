import request from './request';

export async function sendMessage(message: string) {
  let response;
  try {
    response = await request.post<{ data: string }>(`/chat`, { data: { message } });
  } catch (error) {
    throw new Error(`Error sending message to backend: ${error}`);
  }

  return response?.data;
}
