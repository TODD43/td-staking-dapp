import React from 'react';
import { formatBalance } from '../utils/formatting';

interface BalancePanelProps {
  stakedAmount: string;
  pendingRewards: string;
  totalRewardsClaimed: string;
  loading: boolean;
}

const BalancePanel: React.FC<BalancePanelProps> = ({
  stakedAmount,
  pendingRewards,
  totalRewardsClaimed,
  loading,
}) => {
  const stats = [
    {
      label: 'Staked Amount',
      value: formatBalance(stakedAmount),
      color: 'text-blue-400',
    },
    {
      label: 'Pending Rewards',
      value: formatBalance(pendingRewards),
      color: 'text-green-400',
    },
    {
      label: 'Total Claimed',
      value: formatBalance(totalRewardsClaimed),
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.value} TD
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default BalancePanel;
