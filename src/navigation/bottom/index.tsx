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

const BottomNavigation = (_props: BottomNavigationProps) => (
  <Tab.Navigator>
    <Tab.Screen name={BOTTOM_ROUTES.Wallet} component={Wallet} />
    <Tab.Screen name={BOTTOM_ROUTES.Settings} component={Settings} />
  </Tab.Navigator>
);

export default BottomNavigation;
