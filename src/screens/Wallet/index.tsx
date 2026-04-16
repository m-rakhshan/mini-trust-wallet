import React from 'react';
import * as Clipboard from 'expo-clipboard';
import Constants from 'expo-constants';
import QRCode from 'react-native-qrcode-svg';
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { fetchEthBalance } from '../../services';

type WalletProps = {
  walletAddress: string;
};

const Wallet = ({ walletAddress }: WalletProps) => {
  const [balance, setBalance] = React.useState<string>('0.0');
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const ethRpcUrl = (Constants.expoConfig?.extra?.ethRpcUrl as string | undefined) ?? '';

  const loadBalance = React.useCallback(async () => {
    if (!ethRpcUrl) {
      return;
    }

    setIsRefreshing(true);
    try {
      const currentBalance = await fetchEthBalance(walletAddress, ethRpcUrl);
      setBalance(currentBalance);
    } catch (error: any) {
      Alert.alert('Balance unavailable', 'Could not fetch balance from the RPC URL.');
    } finally {
      setIsRefreshing(false);
    }
  }, [ethRpcUrl, walletAddress]);

  React.useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  const handleCopyAddress = async () => {
    await Clipboard.setStringAsync(walletAddress);
    Alert.alert('Copied', 'Wallet address copied to clipboard.');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadBalance} />}
    >
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.label}>Address</Text>
      <Text style={styles.address}>{walletAddress}</Text>

      <View style={styles.qrCard}>
        <QRCode value={walletAddress} size={180} />
      </View>

      <Pressable style={styles.copyButton} onPress={handleCopyAddress}>
        <Text style={styles.copyButtonText}>Copy address</Text>
      </Pressable>

      <View style={styles.balanceCard}>
        <Text style={styles.label}>ETH Balance</Text>
        <Text style={styles.balanceValue}>{balance} ETH</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
  },
  address: {
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 18,
  },
  qrCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  copyButton: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  copyButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
  },
});

export default Wallet;