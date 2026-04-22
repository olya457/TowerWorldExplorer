import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import BlogScreen from '../screens/BlogScreen';
import FactsScreen from '../screens/FactsScreen';
import QuizScreen from '../screens/QuizScreen';
import FloatingTabBar from '../components/FloatingTabBar';
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Facts" component={FactsScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
