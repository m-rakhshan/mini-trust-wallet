import { HDNodeWallet, JsonRpcProvider, Mnemonic, formatEther } from 'ethers';
import * as Crypto from 'expo-crypto';

export const ETH_DERIVATION_PATH = "m/44'/60'/0'/0/0";

export const createWalletMnemonic = (): string => {
  // Use Expo-native secure randomness to avoid runtime issues on device.
  const entropy = Crypto.getRandomBytes(16);
  const mnemonic = Mnemonic.fromEntropy(entropy);
  return mnemonic.phrase;
};

export const validateWalletMnemonic = (mnemonic: string): boolean => {
  const phrase = mnemonic.trim().toLowerCase().replace(/\s+/g, ' ');
  const words = phrase.split(' ');

  if (words.length !== 12 && words.length !== 24) {
    return false;
  }

  return Mnemonic.isValidMnemonic(phrase);
};

export const deriveWalletAddress = (mnemonic: string): string => {
  const phrase = mnemonic.trim().toLowerCase().replace(/\s+/g, ' ');
  const wallet = HDNodeWallet.fromPhrase(phrase, undefined, ETH_DERIVATION_PATH);
  return wallet.address;
};

export const fetchEthBalance = async (
  address: string,
  rpcUrl: string,
): Promise<string> => {
  const provider = new JsonRpcProvider(rpcUrl);
  const balance = await provider.getBalance(address);
  return formatEther(balance);
};

export const isDerivedAddressMatch = (
  mnemonic: string,
  expectedAddress: string,
): boolean => deriveWalletAddress(mnemonic) === expectedAddress;
