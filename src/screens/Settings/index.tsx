import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { styles } from './styles';

type SettingsProps = {
  walletMnemonic: string;
  onWalletReset: () => void;
};

const Settings = ({ walletMnemonic, onWalletReset }: SettingsProps) => {
  const [isSeedVisible, setIsSeedVisible] = React.useState(false);

  const handleRevealSeed = () => {
    Alert.alert(
      'Security warning',
      'Anyone with this phrase can control your wallet. Continue only in private.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reveal', style: 'destructive', onPress: () => setIsSeedVisible(true) },
      ],
    );
  };

  const handleResetWallet = () => {
    Alert.alert('Reset wallet', 'This removes your wallet from this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', onPress: onWalletReset },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Backup and recovery options</Text>

      {!isSeedVisible ? (
        <Pressable style={styles.primaryButton} onPress={handleRevealSeed}>
          <Text style={styles.primaryButtonText}>Reveal recovery phrase</Text>
        </Pressable>
      ) : (
        <View style={styles.seedCard}>
          <Text style={styles.seedLabel}>Recovery phrase</Text>
          <Text style={styles.seedText}>{walletMnemonic}</Text>
        </View>
      )}

      <Pressable style={styles.dangerButton} onPress={handleResetWallet}>
        <Text style={styles.dangerButtonText}>Reset wallet</Text>
      </Pressable>
    </View>
  );
};

export default Settings;