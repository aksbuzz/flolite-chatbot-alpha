export const walletMapper = {
  leaderboard: (data: any) => {
    return data?.map((r: any) => ({
      name: `${r.first_name} ${r.last_name}`,
      ranking: r.ranking,
      lifetime_earnings: r.lifetime_earnings,
    }));
  },
};
