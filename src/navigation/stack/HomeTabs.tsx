import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Col } from 'components';
import { isIos, scale } from 'device';
import {
  colors,
  fonts,
  IconMenuHome,
  IconMenuHomeActive,
  IconMenuStaking,
  IconMenuStakingActive,
  IconMenuNFT,
  IconMenuNFTActive,
  IconMenuMarket,
  IconMenuMarketActive,
} from 'assets';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StakingNavigation from 'navigation/StakingNavigation';
import NFTNavigation from 'navigation/NFTNavigation';
import MarketNavigation from 'navigation/MarketNavigation';
import HomeNavigation from 'navigation/HomeNavigation';

const Tab = createBottomTabNavigator();

interface TProps {
  focused?: boolean;
  children: React.ReactNode;
  label: string;
}

const TabItem = ({ focused, children }: TProps) => {
  return (
    <Col.B style={styles.tab}>
      {children}
      {focused && <View style={styles.activeDot} />}
    </Col.B>
  );
};

const tabBarHeight = scale(72);

const tabIcon24 = {
  width: scale(24),
  height: scale(24),
};

const tabIcon25 = {
  width: scale(25),
  height: scale(25),
};

const listTabs = [
  {
    name: 'Home',
    component: HomeNavigation,
    tabItemActive: <IconMenuHomeActive {...tabIcon24} />,
    tabItemInActive: <IconMenuHome {...tabIcon24} />,
  },
  {
    name: 'Staking',
    component: StakingNavigation,
    tabItemActive: <IconMenuStakingActive {...tabIcon24} />,
    tabItemInActive: <IconMenuStaking {...tabIcon24} />,
  },
  {
    name: 'Collection',
    component: NFTNavigation,
    tabItemActive: <IconMenuNFTActive {...tabIcon25} />,
    tabItemInActive: <IconMenuNFT {...tabIcon25} />,
  },
  {
    name: 'Market',
    component: MarketNavigation,
    tabItemActive: <IconMenuMarketActive {...tabIcon24} />,
    tabItemInActive: <IconMenuMarket {...tabIcon24} />,
  },
];

const HomeTabs = () => {
  const insets = useSafeAreaInsets();

  const renderIcon = ({ focused, tab }: { focused: any; tab: any }) => (
    <TabItem {...{ focused }} label={tab.name}>
      {focused ? tab.tabItemActive : tab.tabItemInActive}
    </TabItem>
  );

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Home">
        {listTabs.map((tab, index) => {
          return (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarIcon: ({ focused }) => renderIcon({ focused, tab }),
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: [
                  styles.tab,
                  {
                    height: tabBarHeight + insets.bottom,
                  },
                ],
              }}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),

    shadowColor: isIos() ? 'rgba(55, 62, 125, 0.05)' : 'rgba(55, 62, 125, 1)',
    shadowOffset: {
      width: 0,
      height: scale(-6),
    },
    shadowRadius: scale(8),
    shadowOpacity: 0.8,

    backgroundColor: colors.cFFFFFF,
  },
  labelStyle: {
    marginTop: scale(5),
    fontFamily: fonts.Poppins.regular,
    fontSize: scale(12),
    color: colors.c000000,
  },
  activeDot: {
    width: scale(6),
    height: scale(6),
    backgroundColor: colors.R1,
    borderRadius: scale(3),
    position: 'absolute',
    bottom: scale(-12),
  },
});

export default HomeTabs;
