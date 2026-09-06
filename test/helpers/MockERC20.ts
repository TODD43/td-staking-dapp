import { ethers } from "hardhat";
import type { Contract, Signer } from "ethers";

/**
 * Mock ERC20 token for testing
 */
class MockERC20 {
  contract: Contract;
  signer: Signer;

  constructor(contract: Contract, signer: Signer) {
    this.contract = contract;
    this.signer = signer;
  }

  async approve(spender: string, amount: bigint): Promise<void> {
    await this.contract.connect(this.signer).approve(spender, amount);
  }

  async transfer(to: string, amount: bigint): Promise<void> {
    await this.contract.connect(this.signer).transfer(to, amount);
  }

  async balanceOf(account: string): Promise<bigint> {
    return await this.contract.balanceOf(account);
  }

  async allowance(owner: string, spender: string): Promise<bigint> {
    return await this.contract.allowance(owner, spender);
  }
}

export { MockERC20 };
