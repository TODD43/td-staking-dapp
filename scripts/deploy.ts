import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Staking contract...");

  // For demonstration, we'll use a mock token address
  // In production, deploy real tokens first
  const stakingTokenAddress = "0x0000000000000000000000000000000000000001";
  const rewardsTokenAddress = "0x0000000000000000000000000000000000000002";

  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(stakingTokenAddress, rewardsTokenAddress);

  await staking.waitForDeployment();

  const stakingAddress = await staking.getAddress();
  console.log("Staking contract deployed to:", stakingAddress);

  // Save contract address to .env for frontend
  console.log("\nAdd this to your .env.local:");
  console.log(`VITE_CONTRACT_ADDRESS=${stakingAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
