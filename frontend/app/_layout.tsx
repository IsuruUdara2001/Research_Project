import { Stack } from "expo-router";
import React from "react";
import { AppSettingsProvider } from "../context/AppSettingsContext";

export default function RootLayout() {
  return (
    <AppSettingsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="camera" />
        <Stack.Screen name="preview" />
        <Stack.Screen name="result" />
        <Stack.Screen name="history" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="batches" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="about" />
        <Stack.Screen name="terms" />
      </Stack>
    </AppSettingsProvider>
  );
}
