import React from 'react';
import * as Clipboard from 'expo-clipboard';
import Constants from 'expo-constants';
import QRCode from 'react-native-qrcode-svg';
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { fetchEthBalance } from '../../services';
import { styles } from './styles';

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

export default Wallet;