import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-12">
      <div className="container py-8 text-center text-slate-400 text-sm">
        <p className="mb-4">
          TD Staking DApp is a demonstration project. See{' '}
          <a
            href="#security"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            SECURITY.md
          </a>
          {' '}for important disclaimers.
        </p>
        <div className="space-y-2 mb-4">
          <p>
            <a
              href="https://github.com/TODD43/td-staking-dapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              GitHub Repository
            </a>
          </p>
          <p>
            <a
              href="https://github.com/TODD43"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Developer: @TODD43
            </a>
          </p>
        </div>
        <p>
          © 2026 Todd Adrian. Licensed under MIT.{' '}
          <a
            href="#license"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            View License
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
