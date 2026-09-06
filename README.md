# TD Staking DApp

> A decentralized staking and rewards application built on blockchain technology.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

TD Staking DApp is a demonstration DeFi application that showcases a modern blockchain staking system. Users can stake tokens, earn rewards, and manage their positions through a clean, responsive web interface.

** This is a testnet demonstration project and has NOT been independently audited for production use. See [SECURITY.md](./SECURITY.md) for important disclaimers.**

## Features

-  **Wallet Integration** — Connect MetaMask or other Web3 wallets
-  **Stake Management** — Deposit and withdraw staking tokens
-  **Reward Tracking** — View earned rewards in real-time
- **Balance Dashboard** — Monitor wallet and contract balances
-  **Responsive Design** — Works seamlessly on desktop and mobile
- **Modern Stack** — Built with React, TypeScript, and ethers.js

## Tech Stack

### Smart Contracts
- **Language:** Solidity 0.8.x
- **Framework:** Hardhat
- **Testing:** Hardhat test framework

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Web3 Library:** ethers.js v6
- **Styling:** Tailwind CSS
- **State Management:** React Context API

## Project Structure

```
td-staking-dapp/
├── contracts/              # Solidity smart contracts
│   └── Staking.sol        # Main staking contract
├── frontend/              # React web application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React Context providers
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Entry point
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Frontend dependencies
├── hardhat.config.ts      # Hardhat configuration
├── package.json           # Root dependencies
├── README.md              # This file
├── SECURITY.md            # Security and disclaimer information
└── LICENSE                # MIT License
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- MetaMask or similar Web3 wallet
- Testnet ETH for gas fees

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TODD43/td-staking-dapp.git
   cd td-staking-dapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and configure:
   - `VITE_CONTRACT_ADDRESS` — Deployed contract address
   - `VITE_NETWORK_ID` — Network chain ID (e.g., 11155111 for Sepolia)

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Local Development

### Running a Local Blockchain

1. **Start Hardhat node:**
   ```bash
   npm run node
   ```
   
   This starts a local blockchain at `http://localhost:8545`.

2. **In another terminal, deploy contracts:**
   ```bash
   npm run deploy:local
   ```
   
   This deploys the Staking contract and outputs the contract address.

3. **Update `.env.local`:**
   ```env
   VITE_CONTRACT_ADDRESS=0x<deployed_contract_address>
   VITE_NETWORK_ID=31337
   VITE_RPC_URL=http://localhost:8545
   ```

4. **Import test account to MetaMask:**
   - Open MetaMask and add a custom network:
     - **Network Name:** Hardhat
     - **RPC URL:** http://localhost:8545
     - **Chain ID:** 31337
   - Import the first account from Hardhat's output (private key starts with `0xac0`)

5. **Start the frontend:**
   ```bash
   npm run dev
   ```

### Testing Smart Contracts

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Testnet Deployment

### Supported Testnets

- **Sepolia** (ETH testnet) — Recommended
- **Goerli** (ETH testnet, deprecated)
- **Polygon Mumbai** (Polygon testnet)

### Deploy to Sepolia

1. **Set up environment variables in `.env.local`:**
   ```env
   # Get from https://www.alchemy.com or https://infura.io
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
   
   # Private key of deployment account (without 0x prefix)
   PRIVATE_KEY=your_wallet_private_key_here
   
   # Optional: For Etherscan verification
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

2. **Get testnet ETH:**
   - Visit [Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
   - Request testnet ETH for your deployment account

3. **Deploy the contract:**
   ```bash
   npm run deploy:sepolia
   ```
   
   The contract address will be displayed. Update `.env.local` with:
   ```env
   VITE_CONTRACT_ADDRESS=0x<deployed_contract_address>
   VITE_NETWORK_ID=11155111
   VITE_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
   ```

4. **Verify contract on block explorer:**
   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

5. **Start the frontend:**
   ```bash
   npm run dev
   ```

### Deploy to Polygon Mumbai

1. **Set up environment variables:**
   ```env
   MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
   PRIVATE_KEY=your_wallet_private_key_here
   ```

2. **Deploy:**
   ```bash
   npm run deploy:mumbai
   ```

## Usage

### Connect Wallet

1. Click "Connect Wallet" button
2. Select MetaMask from the modal
3. Approve the connection in MetaMask
4. You're connected! Your address displays in the header

### Stake Tokens

1. Enter amount to stake
2. Click "Approve" (if first time)
3. Click "Stake" and approve transaction in MetaMask
4. Wait for confirmation
5. Balance updates in real-time

### View Rewards

1. Navigate to "Rewards" tab
2. See your current earned rewards
3. Check reward accrual over time

### Unstake Tokens

1. Enter unstake amount
2. Click "Unstake"
3. Approve transaction in MetaMask
4. Wait for confirmation

## Available Scripts

```bash
# Development
npm run dev              # Start frontend dev server
npm run build            # Build frontend for production

# Smart Contracts
npm run compile          # Compile Solidity contracts
npm run test             # Run contract tests
npm run test:coverage    # Generate test coverage report
npm run node             # Start local blockchain
npm run deploy:local     # Deploy to local blockchain
npm run deploy:sepolia   # Deploy to Sepolia testnet
npm run deploy:mumbai    # Deploy to Polygon Mumbai testnet

# Utilities
npm run lint             # Run ESLint on frontend code
npm run format           # Format code with Prettier
```

## Architecture

### Smart Contract Flow

```
User → Frontend UI → ethers.js → Web3 Provider → Staking Contract
         ↓
         Connect Wallet → Sign Transaction → Blockchain Confirmation
         ↓
         Update UI State ← Listen to Events
```

### Key Functions

**Staking Contract:**
- `stake(amount)` — Stake tokens
- `unstake(amount)` — Withdraw staked tokens
- `claimRewards()` — Claim accumulated rewards
- `getStakedBalance(account)` — Get user's staked amount
- `getPendingRewards(account)` — Get user's pending rewards

**Frontend Components:**
- `WalletConnect` — Wallet connection UI
- `StakeForm` — Staking input and submission
- `RewardsDisplay` — Reward information
- `BalancePanel` — Account balance display
- `TransactionStatus` — Transaction feedback

## Security Considerations

 **This is a demonstration project on testnet. It has NOT been independently audited and should NOT be used in production.**

For full security information, see [SECURITY.md](./SECURITY.md).

### Best Practices Followed

- Solidity 0.8.x with overflow protection
- Event emission for transaction transparency
- Access control patterns
- No unaudited dependencies in contracts

### What's Missing for Production

- Professional security audit
- Enhanced access control (role-based)
- Rate limiting
- Emergency pause mechanisms
- Insurance/protection mechanisms
- Full test coverage

## Troubleshooting

### "Connection Rejected"

- Ensure MetaMask is open and unlocked
- Confirm you're on the correct network
- Try refreshing the page

### "Network Mismatch"

- Check `VITE_NETWORK_ID` in `.env.local`
- Verify MetaMask is set to the correct network
- Testnet ETH on wrong chain won't work

### "Insufficient Gas"

- Ensure account has testnet ETH
- Gas limit is typically ~200k for staking operations
- Visit faucet to get more testnet ETH

### Contract Address Not Found

- Verify `VITE_CONTRACT_ADDRESS` in `.env.local`
- Re-run deployment if needed
- Check contract is deployed on correct network

## Contributing

This is a personal portfolio project. For improvements or feedback, please open an issue.

## License

MIT License — See [LICENSE](./LICENSE) file for details.

## Disclaimer

This project is for educational and demonstration purposes only. It has not been independently audited and should not be used with real funds. See [SECURITY.md](./SECURITY.md) for complete disclaimers.

## Contact

- **GitHub:** [@TODD43](https://github.com/TODD43)
- **Portfolio Project:** [TD Staking DApp](https://github.com/TODD43/td-staking-dapp)

---

**Last Updated:** September 2026
