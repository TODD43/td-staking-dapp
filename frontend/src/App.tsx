import React, { useState, useEffect } from 'react';
import { useWallet } from './context/WalletContext';
import { useStakingContract } from './hooks/useStakingContract';
import { useStakeData } from './hooks/useStakeData';
import Header from './components/Header';
import Footer from './components/Footer';
import WalletConnect from './components/WalletConnect';
import StakeForm from './components/StakeForm';
import BalancePanel from './components/BalancePanel';
import Alert from './components/Alert';
import './index.css';

const App: React.FC = () => {
  const { isConnected } = useWallet();
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const contract = useStakingContract(contractAddress);
  const { stakedAmount, pendingRewards, totalRewardsClaimed, loading, error: dataError } = useStakeData(contract);
  
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [isTransacting, setIsTransacting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTransaction = async (fn: () => Promise<any>, successMessage: string) => {
    setIsTransacting(true);
    setTransactionError(null);
    try {
      const tx = await fn();
      if (tx?.wait) {
        await tx.wait();
      }
      console.log(successMessage);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Transaction failed';
      setTransactionError(message);
    } finally {
      setIsTransacting(false);
    }
  };

  const handleStake = async (amount: string) => {
    if (!contract) return;
    await handleTransaction(
      () => contract.stake(amount),
      'Tokens staked successfully'
    );
  };

  const handleUnstake = async (amount: string) => {
    if (!contract) return;
    await handleTransaction(
      () => contract.unstake(amount),
      'Tokens unstaked successfully'
    );
  };

  const handleClaimRewards = async () => {
    if (!contract) return;
    await handleTransaction(
      () => contract.claimRewards(),
      'Rewards claimed successfully'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      <Header>
        <WalletConnect />
      </Header>

      <main className="flex-1 container py-8">
        {!isConnected ? (
          <div className="card text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to TD Staking DApp</h2>
            <p className="text-slate-300 mb-6 max-w-md mx-auto">
              Connect your wallet to start staking tokens and earning rewards. This is a demonstration project for testnet use only.
            </p>
            <div className="bg-slate-700 rounded-lg p-4 text-left text-sm mb-6 max-w-md mx-auto">
              <p className="font-semibold mb-2 text-yellow-400">⚠️ Testnet Only</p>
              <p className="text-slate-300">
                This application is designed for testnet environments (Sepolia, Mumbai). It has not been audited for production use. See{' '}
                <a href="https://github.com/TODD43/td-staking-dapp/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                  SECURITY.md
                </a>
                {' '}for details.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Portfolio</h2>
              <BalancePanel
                stakedAmount={stakedAmount}
                pendingRewards={pendingRewards}
                totalRewardsClaimed={totalRewardsClaimed}
                loading={loading}
              />
            </div>

            {!contractAddress ? (
              <Alert
                type="error"
                message="Contract address not configured. Please set VITE_CONTRACT_ADDRESS in .env.local"
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <StakeForm
                    stakedAmount={stakedAmount}
                    onStake={handleStake}
                    onUnstake={handleUnstake}
                    onClaimRewards={handleClaimRewards}
                    isLoading={isTransacting}
                    error={transactionError}
                    onErrorDismiss={() => setTransactionError(null)}
                  />
                </div>

                <div>
                  <div className="card">
                    <h3 className="text-lg font-bold mb-4">About</h3>
                    <p className="text-slate-300 text-sm mb-4">
                      TD Staking DApp demonstrates a simple staking mechanism where users can stake tokens and earn rewards over time.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-slate-400">Reward Rate:</span> <span className="text-green-400 font-medium">0.1% per annum</span></p>
                      <p><span className="text-slate-400">Status:</span> <span className="text-yellow-400 font-medium">Testnet</span></p>
                      <p><span className="text-slate-400">Network:</span> <span className="text-blue-400 font-medium">Sepolia / Mumbai / Localhost</span></p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-xs text-slate-400 mb-3">Learn more:</p>
                      <div className="space-y-2">
                        <a
                          href="https://github.com/TODD43/td-staking-dapp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-400 hover:text-blue-300 text-sm underline"
                        >
                          → View on GitHub
                        </a>
                        <a
                          href="https://github.com/TODD43/td-staking-dapp/blob/main/SECURITY.md"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-400 hover:text-blue-300 text-sm underline"
                        >
                          → Security & Disclaimers
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
