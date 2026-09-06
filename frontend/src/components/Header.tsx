import React from 'react';

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">TD</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">TD Staking DApp</h1>
            <p className="text-xs text-slate-400">Decentralized Staking & Rewards</p>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
};

export default Header;
