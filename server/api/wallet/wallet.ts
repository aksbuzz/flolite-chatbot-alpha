import request from '../../util/request';
import { walletMapper } from './mapper';

export async function getLeaderboard({ type = 'monthly' }: { type: string }) {
  const response = await request.get(`/wallet/leaderboard?type=${type}`);
  return walletMapper.leaderboard(response?.data);
}

export async function getCoinSystem() {
  const response = await request.get(`/wallet/coins_system`);
  return response?.data;
}
