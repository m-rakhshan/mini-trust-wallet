import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Settings, Wallet } from '../../screens';
import { BOTTOM_ROUTES } from './routes';

export type BottomNavigationProps = {
  walletAddress: string;
  walletMnemonic: string;
  onWalletReset: () => void;
};

const Tab = createBottomTabNavigator();

const BottomNavigation = (props: BottomNavigationProps) => (
  <Tab.Navigator>
    <Tab.Screen name={BOTTOM_ROUTES.Wallet}>
      {() => <Wallet walletAddress={props.walletAddress} />}
    </Tab.Screen>
    <Tab.Screen name={BOTTOM_ROUTES.Settings}>
      {() => (
        <Settings
          walletMnemonic={props.walletMnemonic}
          onWalletReset={props.onWalletReset}
        />
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

export default BottomNavigation;
