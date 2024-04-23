import request from '../../util/request';
import { profileMapper } from './mapper';

export async function getMyProfile() {
  const userId = await getUserId();
  if (!userId) {
    return {};
  }
  const response = await request.get(`/my-profile/${userId}/getEmployeeDetails`);
  return profileMapper.profile(response?.data);
}

async function getUserId() {
  const response = await request.get(`/my-profile/details`);
  return response?.data?.user_id;
}
