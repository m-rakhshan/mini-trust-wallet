import React from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

import {
  createWalletMnemonic,
  deriveWalletAddress,
  validateWalletMnemonic,
} from '../../services';
import { saveMnemonic } from '../../storage';
import { styles } from './styles';

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

export default Onboarding;