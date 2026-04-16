import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import BottomNavigation from './bottom';

type AppNavigationProps = {
  walletAddress: string;
  walletMnemonic: string;
  onWalletReset: () => void;
};

const AppNavigation = ({
  walletAddress,
  walletMnemonic,
  onWalletReset,
}: AppNavigationProps) => (
  <NavigationContainer>
    <BottomNavigation
      walletAddress={walletAddress}
      walletMnemonic={walletMnemonic}
      onWalletReset={onWalletReset}
    />
  </NavigationContainer>
);

export default AppNavigation;
