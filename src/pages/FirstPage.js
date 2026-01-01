import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function TeaBioApp({ navigation }) {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace("StartPage");
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigation]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.splashContainer}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>TeaBio</Text>
        </View>
        <Text style={styles.tagline}>Smart Tea Supply Management</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#6B9B8A",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 56,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
    letterSpacing: 0.5,
    fontWeight: "300",
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 80,
    width: "60%",
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
});