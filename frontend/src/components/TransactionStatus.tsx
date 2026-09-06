import React from 'react';

interface TransactionStatusProps {
  status: 'pending' | 'success' | 'error' | null;
  message: string;
  txHash?: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ status, message, txHash }) => {
  if (!status) return null;

  const statusStyles = {
    pending: 'bg-blue-900 border-blue-700 text-blue-100',
    success: 'bg-green-900 border-green-700 text-green-100',
    error: 'bg-red-900 border-red-700 text-red-100',
  };

  return (
    <div className={`alert ${statusStyles[status]}`} role="alert">
      <div className="flex items-center gap-3">
        {status === 'pending' && <div className="spinner"></div>}
        {status === 'success' && <span className="text-2xl">✓</span>}
        {status === 'error' && <span className="text-2xl">✕</span>}
        <div>
          <p className="font-medium">{message}</p>
          {txHash && (
            <a
              href={`https://etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline hover:opacity-80"
            >
              View on Etherscan
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;
