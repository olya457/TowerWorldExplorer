import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoaderScreen from '../screens/LoaderScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import TabNavigator from './TabNavigator';
import TowerDetailScreen from '../screens/TowerDetailScreen';
import BlogDetailScreen from '../screens/BlogDetailScreen';
import QuizGameScreen from '../screens/QuizGameScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loader"
      screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: '#0B1733' } }}>
      <Stack.Screen name="Loader" component={LoaderScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="TowerDetail"
        component={TowerDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="QuizGame"
        component={QuizGameScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{ animation: 'fade' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
