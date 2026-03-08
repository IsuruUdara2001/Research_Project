import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import "react-native-reanimated";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import FirstPage from "./src/pages/FirstPage";
import StartPage from "./src/pages/StartPage";
import LoginPage from "./src/pages/LoginPage";
import MenuPage from "./src/pages/Menupage";
import LiveHumidity from "./src/pages/LiveHumidity";
import Analytics from "./src/pages/Analytics";
import Dashboard from "./src/pages/Dashboard";
import ModelTraining from "./src/pages/ModelTraining";
import Reports from "./src/pages/Reports";
import Settings from "./src/pages/Settings";
import Alerts from "./src/pages/Alerts";
import WitheringPrediction from "./src/pages/WitheringPrediction"; // New import

import AnalyticsResult from "./src/pages/AnalyticsResult";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          ...Ionicons.font,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FirstPage" component={FirstPage} />
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Analytics" component={Analytics} />
          <Stack.Screen name="AnalyticsResult" component={AnalyticsResult} />
          <Stack.Screen name="ModelTraining" component={ModelTraining} />
          <Stack.Screen name="Reports" component={Reports} />
          <Stack.Screen name="Alerts" component={Alerts} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="LiveHumidity" component={LiveHumidity} />
          <Stack.Screen name="MenuPage" component={MenuPage} />
          <Stack.Screen name="WitheringPrediction" component={WitheringPrediction} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}