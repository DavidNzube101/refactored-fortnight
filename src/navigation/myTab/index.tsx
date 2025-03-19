import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../../screens/homeScreen/home/index';
import {
  Car,
  CarPrimary,
  Category,
  Home,
  HomeLight,
  Setting,
  SettingPrimary,
} from '@utils/icons';
import { ProfileSetting } from '../../screens/bottomTab/profileTab/profileSetting/index';
import { RideScreen } from '../../screens/bottomTab/myRide/RideScreen/index';
import { CategoryScreen } from '../../screens/bottomTab/category/categoryScreen/index';
import { appColors } from '@src/themes';
import { Text } from 'react-native';
import { useValues } from '../../../App';
import styles from './styles';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  const { isDark } = useValues();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          ...styles.tabBar,
          borderTopColor: isDark ? appColors.darkPrimary : appColors.lightGray,
          backgroundColor: isDark ? appColors.darkHeader : appColors.whiteColor,
        },

        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.text, { color: focused ? appColors.buttonBg : appColors.regularText }]}>
              {'Home'}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Home colors={appColors.buttonBg} width={24} height={24} />
            ) : (
              <HomeLight />
            );
          },
        }}
      />
      <Tab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.text, { color: focused ? appColors.buttonBg : appColors.regularText }]}>
              {'Services'}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Category fill={appColors.buttonBg} colors={appColors.buttonBg} />
            ) : (
              <Category colors={appColors.regularText} />
            );
          },
        }}
      />
      <Tab.Screen
        name="RideScreen"
        component={RideScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.text, { color: focused ? appColors.buttonBg : appColors.regularText }]}>
              {'Rides'}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return focused ? <CarPrimary /> : <Car colors={appColors.regularText} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileSetting}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.text, { color: focused ? appColors.buttonBg : appColors.regularText }]}>
              {'Setting'}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <SettingPrimary />
            ) : (
              <Setting colors={appColors.regularText} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

