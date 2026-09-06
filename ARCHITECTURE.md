# Project Architecture

## System Overview

```
┌─────────────────────────────────────────┐
│   User Browser (React Frontend)         │
│  ┌───────────────────────────────────┐  │
│  │  React Components                 │  │
│  │  - WalletConnect                  │  │
│  │  - StakeForm                      │  │
│  │  - BalancePanel                   │  │
│  └───────────────────────────────────┘  │
│            │                             │
│            │ ethers.js                  │
│            ▼                             │
│  ┌───────────────────────────────────┐  │
│  │  Wallet Context                   │  │
│  │  - Account Management             │  │
│  │  - Provider Connection            │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
            │
            │ JSON-RPC over HTTP(S)
            ▼
┌─────────────────────────────────────────┐
│   Web3 Provider (MetaMask, etc)         │
│  - Manages private keys                 │
│  - Signs transactions                   │
└─────────────────────────────────────────┘
            │
            │ Transactions
            ▼
┌─────────────────────────────────────────┐
│   Blockchain Network                    │
│  (Sepolia / Mumbai / Localhost)         │
│  ┌───────────────────────────────────┐  │
│  │  Staking Smart Contract           │  │
│  │  - Token Management               │  │
│  │  - Reward Calculation             │  │
│  │  - Event Emission                 │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Contract Architecture

### Staking.sol Structure

```solidity
contract Staking {
  // State
  - IERC20 stakingToken
  - IERC20 rewardsToken
  - uint256 rewardRate
  - mapping(address => StakeInfo) stakes
  - uint256 totalStaked

  // Functions
  - stake(uint256)
  - unstake(uint256)
  - claimRewards()
  - getPendingRewards(address) [view]
  - getStakedBalance(address) [view]
  - setRewardRate(uint256) [owner]
}
```

### Reward Calculation

```
Pending Rewards = (StakedAmount × RewardRate × TimeSinceLastClaim) / (365 days × 10000)

Example:
- Staked: 100 tokens
- Rate: 10 (0.1% per year)
- Time: 1 year
- Rewards = (100 × 10 × 365 days) / (365 days × 10000) = 0.1 tokens
```

## Frontend Architecture

### Component Hierarchy

```
App (main component)
├── Header
│   └── WalletConnect
├── Main Content
│   ├── Welcome Screen (if disconnected)
│   └── Dashboard (if connected)
│       ├── BalancePanel
│       │   ├── Staked Amount Card
│       │   ├── Pending Rewards Card
│       │   └── Total Claimed Card
│       ├── StakeForm
│       │   ├── Stake Tab
│       │   ├── Unstake Tab
│       │   └── Claim Rewards Button
│       └── Info Sidebar
└── Footer
```

### Data Flow

```
User Action
    ↓
Component (e.g., StakeForm)
    ↓
Event Handler (e.g., handleStake)
    ↓
Contract Call (via ethers.js)
    ↓
MetaMask (sign & send)
    ↓
Blockchain (execute)
    ↓
Transaction Confirmation
    ↓
UI Update (via useStakeData hook)
```

### State Management

**Global State (Context):**
- `WalletContext` - Account, provider, connection status

**Component State (Hooks):**
- `useStakingContract` - Contract instance
- `useStakeData` - Stake balance, rewards, claimed amounts
- Local state - Form inputs, transaction status

## Deployment Architecture

### Local Development

```
Hardhat Node (localhost:8545)
    ↓
Contracts (deployed locally)
    ↓
React Dev Server (localhost:5173)
    ↓
MetaMask (pointed to localhost)
```

### Testnet Deployment

```
Testnet RPC (Alchemy/Infura)
    ↓
Contracts (deployed to Sepolia/Mumbai)
    ↓
React App (Vercel/Netlify)
    ↓
MetaMask (user's browser)
```

## Dependencies

### Smart Contracts
- `@openzeppelin/contracts/token/ERC20/IERC20.sol`
- `@openzeppelin/contracts/access/Ownable.sol`
- `@openzeppelin/contracts/security/ReentrancyGuard.sol`

### Frontend
- `react` - UI framework
- `react-dom` - DOM rendering
- `ethers.js` - Web3 library
- `tailwindcss` - Styling
- `vite` - Build tool
- `typescript` - Type safety

### Development
- `hardhat` - Solidity development
- `@nomicfoundation/hardhat-toolbox` - Testing
- `typechain` - Type generation

## Security Considerations

### Smart Contract
- ✅ Solidity 0.8.20 (overflow protection)
- ✅ OpenZeppelin Ownable (access control)
- ✅ ReentrancyGuard (reentrancy protection)
- ✅ Event emission (transaction logging)
- ❌ No professional audit
- ❌ No circuit breaker/pause function

### Frontend
- ✅ TypeScript (type safety)
- ✅ Error handling
- ✅ Input validation
- ✅ Responsive design
- ❌ No RPC failover
- ❌ No rate limiting

## Scalability Considerations

### Current Limitations
- Single contract instance
- No state caching
- No batched transactions
- No off-chain indexing (The Graph)

### Future Improvements
- Event-based indexing
- Contract upgradeability (proxy pattern)
- Multi-sig governance
- Stake delegation
- Reward multipliers based on lock time

## Performance Metrics

### Smart Contract
- Stake: ~60,000 gas
- Unstake: ~65,000 gas
- Claim Rewards: ~70,000 gas

### Frontend
- Initial Load: <2s (optimized)
- Contract Interaction: <500ms (with user confirmation)
- Real-time Updates: 10s refresh interval

---

**Last Updated:** September 2026
