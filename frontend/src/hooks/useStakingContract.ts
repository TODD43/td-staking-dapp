import { useWallet } from '../context/WalletContext';
import { Contract, BrowserProvider } from 'ethers';
import { useEffect, useState } from 'react';

const STAKING_ABI = [
  'function stake(uint256 amount) external',
  'function unstake(uint256 amount) external',
  'function claimRewards() external',
  'function getStakedBalance(address user) external view returns (uint256)',
  'function getPendingRewards(address user) external view returns (uint256)',
  'function getTotalRewardsClaimed(address user) external view returns (uint256)',
  'function totalStaked() external view returns (uint256)',
  'function rewardRate() external view returns (uint256)',
];

export const useStakingContract = (contractAddress: string | undefined) => {
  const { provider, account } = useWallet();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (provider && contractAddress && account) {
      const signer = provider.getSigner();
      const stakingContract = new Contract(contractAddress, STAKING_ABI, signer);
      setContract(stakingContract);
    }
  }, [provider, contractAddress, account]);

  return contract;
};
