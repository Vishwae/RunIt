import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/AuthScreen';

const DARK_THEME = {
  dark: true,
  colors: {
    primary: '#FF6B2C',
    background: '#0D0D0D',
    card: '#1A1A1A',
    text: '#F5F5F5',
    border: '#2A2A2A',
    notification: '#FF6B2C',
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <StatusBar style="light" />
        <AuthScreen onLogin={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return (
    <NavigationContainer theme={DARK_THEME}>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}
