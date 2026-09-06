import { useWallet } from '../context/WalletContext';
import { useEffect, useState } from 'react';

interface StakeData {
  stakedAmount: string;
  pendingRewards: string;
  totalRewardsClaimed: string;
  loading: boolean;
  error: string | null;
}

export const useStakeData = (contract: any | null, refreshTrigger: number = 0) => {
  const { account } = useWallet();
  const [data, setData] = useState<StakeData>({
    stakedAmount: '0',
    pendingRewards: '0',
    totalRewardsClaimed: '0',
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!contract || !account) return;

      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const [staked, rewards, claimed] = await Promise.all([
          contract.getStakedBalance(account),
          contract.getPendingRewards(account),
          contract.getTotalRewardsClaimed(account),
        ]);

        setData({
          stakedAmount: staked.toString(),
          pendingRewards: rewards.toString(),
          totalRewardsClaimed: claimed.toString(),
          loading: false,
          error: null,
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch data',
        }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [contract, account, refreshTrigger]);

  return data;
};
