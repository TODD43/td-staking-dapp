import React, { useState } from 'react';
import { formatBalance } from '../utils/formatting';
import Alert from './Alert';

interface StakeFormProps {
  stakedAmount: string;
  onStake: (amount: string) => Promise<void>;
  onUnstake: (amount: string) => Promise<void>;
  onClaimRewards: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onErrorDismiss: () => void;
}

const StakeForm: React.FC<StakeFormProps> = ({
  stakedAmount,
  onStake,
  onUnstake,
  onClaimRewards,
  isLoading,
  error,
  onErrorDismiss,
}) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');

  const handleStake = async () => {
    if (!stakeAmount) return;
    await onStake(stakeAmount);
    setStakeAmount('');
  };

  const handleUnstake = async () => {
    if (!unstakeAmount) return;
    await onUnstake(unstakeAmount);
    setUnstakeAmount('');
  };

  return (
    <div className="card">
      {error && <Alert type="error" message={error} onClose={onErrorDismiss} />}

      <h2 className="text-2xl font-bold mb-6">Staking Dashboard</h2>

      <div className="mb-6 p-4 bg-slate-700 rounded-lg">
        <p className="text-slate-300 text-sm">Currently Staked</p>
        <p className="text-3xl font-bold text-blue-400">{formatBalance(stakedAmount)} TD</p>
      </div>

      <div className="tabs mb-6 border-b border-slate-700">
        <button
          onClick={() => setActiveTab('stake')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'stake'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Stake
        </button>
        <button
          onClick={() => setActiveTab('unstake')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'unstake'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Unstake
        </button>
      </div>

      {activeTab === 'stake' && (
        <div className="space-y-4">
          <div>
            <label className="label">Amount to Stake (TD)</label>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.00"
              className="input"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleStake}
            disabled={isLoading || !stakeAmount}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Processing...' : 'Stake Tokens'}
          </button>
        </div>
      )}

      {activeTab === 'unstake' && (
        <div className="space-y-4">
          <div>
            <label className="label">Amount to Unstake (TD)</label>
            <input
              type="number"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              placeholder="0.00"
              className="input"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleUnstake}
            disabled={isLoading || !unstakeAmount}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Processing...' : 'Unstake Tokens'}
          </button>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-slate-700">
        <button
          onClick={onClaimRewards}
          disabled={isLoading}
          className="btn btn-success w-full"
        >
          {isLoading ? 'Processing...' : 'Claim Rewards'}
        </button>
      </div>
    </div>
  );
};

export default StakeForm;
