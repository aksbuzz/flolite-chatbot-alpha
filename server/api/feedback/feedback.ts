import request from '../../util/request';

export async function submitAnonymousFeedback({ feedback_data }: { feedback_data: string }) {
  const response = await request.post(`/my-profile/anonymous/email`, {
    data: { feedback_data },
  });

  return response?.data;
}
