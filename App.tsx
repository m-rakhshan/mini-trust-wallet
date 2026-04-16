import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import AppNavigation from './src/navigation';
import Onboarding from './src/screens/Onboarding';
import { deriveWalletAddress } from './src/services';
import { clearMnemonic, getMnemonic } from './src/storage';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [mnemonic, setMnemonic] = React.useState<string | null>(null);
  const [address, setAddress] = React.useState<string>('');

  React.useEffect(() => {
    const loadWallet = async () => {
      try {
        const storedMnemonic = await getMnemonic();
        if (!storedMnemonic) {
          return;
        }
        setMnemonic(storedMnemonic);
        setAddress(deriveWalletAddress(storedMnemonic));
      } finally {
        setIsLoading(false);
      }
    };

    loadWallet();
  }, []);

  const handleWalletReady = React.useCallback(
    (payload: { mnemonic: string; address: string }) => {
      setMnemonic(payload.mnemonic);
      setAddress(payload.address);
    },
    [],
  );

  const handleWalletReset = React.useCallback(async () => {
    await clearMnemonic();
    setMnemonic(null);
    setAddress('');
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0f172a" />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!mnemonic) {
    return <Onboarding onWalletReady={handleWalletReady} />;
  }

  return (
    <>
      <AppNavigation
        walletAddress={address}
        walletMnemonic={mnemonic}
        onWalletReset={handleWalletReset}
      />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
