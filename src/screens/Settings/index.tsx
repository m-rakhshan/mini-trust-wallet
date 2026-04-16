import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#475569',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  seedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  seedLabel: {
    color: '#475569',
    marginBottom: 6,
  },
  seedText: {
    color: '#0f172a',
    lineHeight: 22,
  },
  dangerButton: {
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  dangerButtonText: {
    color: '#dc2626',
    fontWeight: '600',
  },
});

export default Settings;