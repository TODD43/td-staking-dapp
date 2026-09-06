import { ethers } from 'ethers';

export const formatBalance = (balance: string, decimals: number = 18): string => {
  if (!balance || balance === '0') return '0.00';
  return parseFloat(ethers.formatUnits(balance, decimals)).toFixed(2);
};

export const formatAddress = (address: string | null): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

export const parseTokenAmount = (amount: string, decimals: number = 18): bigint => {
  return ethers.parseUnits(amount || '0', decimals);
};
