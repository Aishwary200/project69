import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createBottomTabNavigator } from "react-navigation-tabs"; 
import {createAppContainer} from 'react-navigation';
import ScanScreen from './screens/ScanScreen';

export default function App() {
  return (
    <AppContainer/>
  );
}

const TabNavigator=createBottomTabNavigator({
  Scan:{screen:ScanScreen},
})
const AppContainer=createAppContainer(TabNavigator)