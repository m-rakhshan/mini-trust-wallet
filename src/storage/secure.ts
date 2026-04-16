import * as SecureStore from 'expo-secure-store';

const MNEMONIC_STORAGE_KEY = 'wallet_mnemonic';

export const saveMnemonic = async (mnemonic: string): Promise<void> => {
  await SecureStore.setItemAsync(MNEMONIC_STORAGE_KEY, mnemonic);
};

export const getMnemonic = async (): Promise<string | null> =>
  SecureStore.getItemAsync(MNEMONIC_STORAGE_KEY);

export const clearMnemonic = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(MNEMONIC_STORAGE_KEY);
};
