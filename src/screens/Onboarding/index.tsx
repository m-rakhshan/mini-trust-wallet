import React from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  createWalletMnemonic,
  deriveWalletAddress,
  validateWalletMnemonic,
} from '../../services';
import { saveMnemonic } from '../../storage';

type OnboardingProps = {
  onWalletReady: (payload: { mnemonic: string; address: string }) => void;
};

const Onboarding = ({ onWalletReady }: OnboardingProps) => {
  const [importMnemonic, setImportMnemonic] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);

  const completeSetup = async (mnemonic: string) => {
    setIsSaving(true);
    try {
      const address = deriveWalletAddress(mnemonic);
      await saveMnemonic(mnemonic);
      onWalletReady({ mnemonic, address });
    } catch (error) {
      Alert.alert('Setup failed', 'Unable to create wallet. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateWallet = async () => {
    const mnemonic = createWalletMnemonic();
    if (!mnemonic) {
      Alert.alert('Setup failed', 'Mnemonic was not generated. Please try again.');
      return;
    }
    await completeSetup(mnemonic);
  };

  const handleImportWallet = async () => {
    if (!validateWalletMnemonic(importMnemonic)) {
      Alert.alert('Invalid phrase', 'Enter a valid 12 or 24 word recovery phrase.');
      return;
    }
    await completeSetup(importMnemonic.trim().toLowerCase().replace(/\s+/g, ' '));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Trust Wallet</Text>
      <Text style={styles.subtitle}>Create a new wallet or import recovery phrase.</Text>

      <Pressable onPress={handleCreateWallet} style={styles.primaryButton} disabled={isSaving}>
        <Text style={styles.primaryButtonText}>
          {isSaving ? 'Please wait...' : 'Create new wallet'}
        </Text>
      </Pressable>

      <Text style={styles.sectionLabel}>Import existing wallet</Text>
      <TextInput
        value={importMnemonic}
        onChangeText={setImportMnemonic}
        placeholder="Enter 12 or 24 word phrase"
        multiline
        autoCapitalize="none"
        editable={!isSaving}
        style={styles.input}
      />
      <Pressable onPress={handleImportWallet} style={styles.secondaryButton} disabled={isSaving}>
        <Text style={styles.secondaryButtonText}>Import wallet</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 72,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 12,
    textAlignVertical: 'top',
  },
  primaryButton: {
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#0f172a',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f172a',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default Onboarding;