export interface StakeData {
  stakedAmount: bigint;
  pendingRewards: bigint;
  totalRewardsClaimed: bigint;
}

export interface TransactionStatus {
  type: 'pending' | 'success' | 'error' | null;
  message: string;
}

export interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
}
