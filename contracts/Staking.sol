// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Staking
 * @dev A simple staking contract for demonstration purposes.
 * WARNING: This contract is for testnet/educational use only and has not been audited.
 */
contract Staking is Ownable, ReentrancyGuard {
    IERC20 public stakingToken;
    IERC20 public rewardsToken;

    uint256 public rewardRate = 10; // 10% annual reward rate (in basis points, e.g., 10 = 0.1%)
    uint256 public constant DENOMINATOR = 10000; // For percentage calculations

    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 lastClaimTime;
    }

    mapping(address => StakeInfo) public stakes;
    mapping(address => uint256) public totalRewardsClaimed;

    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount, uint256 timestamp);
    event Unstaked(address indexed user, uint256 amount, uint256 timestamp);
    event RewardsClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event RewardRateUpdated(uint256 newRate);

    /**
     * @dev Initialize staking contract with token addresses
     * @param _stakingToken Address of the token to stake
     * @param _rewardsToken Address of the token to distribute as rewards
     */
    constructor(address _stakingToken, address _rewardsToken) {
        require(_stakingToken != address(0), "Invalid staking token");
        require(_rewardsToken != address(0), "Invalid rewards token");
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    /**
     * @dev Stake tokens in the contract
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            stakingToken.balanceOf(msg.sender) >= amount,
            "Insufficient token balance"
        );
        require(
            stakingToken.allowance(msg.sender, address(this)) >= amount,
            "Insufficient allowance"
        );

        // Claim pending rewards if already staking
        if (stakes[msg.sender].amount > 0) {
            uint256 pendingRewards = getPendingRewards(msg.sender);
            if (pendingRewards > 0) {
                _claimRewards(msg.sender, pendingRewards);
            }
        }

        // Update stake info
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].startTime = block.timestamp;
        stakes[msg.sender].lastClaimTime = block.timestamp;
        totalStaked += amount;

        // Transfer tokens to contract
        require(
            stakingToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        emit Staked(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Unstake tokens from the contract
     * @param amount Amount of tokens to unstake
     */
    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            stakes[msg.sender].amount >= amount,
            "Insufficient staked balance"
        );

        // Claim pending rewards before unstaking
        uint256 pendingRewards = getPendingRewards(msg.sender);
        if (pendingRewards > 0) {
            _claimRewards(msg.sender, pendingRewards);
        }

        // Update stake info
        stakes[msg.sender].amount -= amount;
        stakes[msg.sender].lastClaimTime = block.timestamp;
        totalStaked -= amount;

        // Transfer tokens back to user
        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");

        emit Unstaked(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Claim accumulated rewards
     */
    function claimRewards() external nonReentrant {
        require(stakes[msg.sender].amount > 0, "No staked tokens");

        uint256 rewards = getPendingRewards(msg.sender);
        require(rewards > 0, "No pending rewards");

        _claimRewards(msg.sender, rewards);
    }

    /**
     * @dev Internal function to claim rewards
     */
    function _claimRewards(address user, uint256 amount) internal {
        require(
            rewardsToken.balanceOf(address(this)) >= amount,
            "Insufficient rewards"
        );

        stakes[user].lastClaimTime = block.timestamp;
        totalRewardsClaimed[user] += amount;

        require(rewardsToken.transfer(user, amount), "Reward transfer failed");

        emit RewardsClaimed(user, amount, block.timestamp);
    }

    /**
     * @dev Get pending rewards for a user
     * @param user Address of the user
     * @return Pending rewards amount
     */
    function getPendingRewards(address user) public view returns (uint256) {
        if (stakes[user].amount == 0) {
            return 0;
        }

        uint256 timeDifference = block.timestamp - stakes[user].lastClaimTime;
        uint256 rewards = (stakes[user].amount * rewardRate * timeDifference) /
            (365 days * DENOMINATOR);

        return rewards;
    }

    /**
     * @dev Get staked balance of a user
     * @param user Address of the user
     * @return Staked amount
     */
    function getStakedBalance(address user) external view returns (uint256) {
        return stakes[user].amount;
    }

    /**
     * @dev Get total rewards claimed by a user
     * @param user Address of the user
     * @return Total rewards claimed
     */
    function getTotalRewardsClaimed(address user)
        external
        view
        returns (uint256)
    {
        return totalRewardsClaimed[user];
    }

    /**
     * @dev Update reward rate (owner only)
     * @param newRate New reward rate in basis points
     */
    function setRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 10000, "Rate too high");
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }

    /**
     * @dev Withdraw rewards tokens (owner only) - for emergency use
     * @param amount Amount to withdraw
     */
    function withdrawRewards(uint256 amount) external onlyOwner {
        require(
            rewardsToken.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );
        require(rewardsToken.transfer(owner(), amount), "Transfer failed");
    }

    /**
     * @dev Get contract balance of rewards token
     */
    function getRewardTokenBalance() external view returns (uint256) {
        return rewardsToken.balanceOf(address(this));
    }
}
