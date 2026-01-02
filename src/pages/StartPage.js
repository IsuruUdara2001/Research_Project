import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function TeaBioStartPage({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [floatAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const floatTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const handleGetStarted = () => {
    navigation.navigate("LoginPage");
    console.log("Get Started pressed");
  };

  const features = [
    { icon: "leaf", label: "Track Supply", color: "#66BB6A" },
    { icon: "analytics", label: "Analytics", color: "#42A5F5" },
    { icon: "people", label: "Manage Farmers", color: "#6B9B8A" },
  ];

  return (
    <View style={styles.container}>
      {/* Subtle background pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.patternCircle, styles.circle1]} />
        <View style={[styles.patternCircle, styles.circle2]} />
        <View style={[styles.patternCircle, styles.circle3]} />
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* App Logo/Brand */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoIcon, { marginRight: 8 }]}>
              <Ionicons name="leaf" size={22} color="#6B9B8A" />
            </View>
            <Text style={styles.logoText}>TeaBio</Text>
          </View>
        </View>

        {/* Main Visual - Tea Farming Illustration */}
        <Animated.View
          style={[
            styles.illustrationContainer,
            { transform: [{ translateY: floatTranslate }] },
          ]}
        >
          <View style={styles.illustrationCard}>
            <Image
              source={require("../../assets/tea.png")}
              style={styles.illustrationImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
          </View>

          {/* Live Stats Badge */}
          <Animated.View
            style={[styles.statsBadge, { transform: [{ scale: pulseAnim }] }]}
          >
            <Ionicons
              name="stats-chart"
              size={14}
              color="#6B9B8A"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.statsBadgeText}>Live Monitoring</Text>
          </Animated.View>
        </Animated.View>

        {/* Content */}
        <View style={styles.textContent}>
          <Text style={styles.mainTitle}>Smart Tea Supply Management</Text>
          <Text style={styles.description}>
            Monitor humidity, track farmer supplies, and analyze production data
            in real-time
          </Text>

          {/* Feature Pills */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View
                key={index}
                style={[styles.featurePill, { marginRight: 8, marginBottom: 8 }]}
              >
                <Ionicons
                  name={feature.icon}
                  size={14}
                  color={feature.color}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.featureText}>{feature.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* CTA Button */}
      <Animated.View style={[styles.buttonWrapper, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress={handleGetStarted}
        >
          <Text style={styles.ctaButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Join farmers and track your tea supply efficiently
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5",
  },
  backgroundPattern: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  patternCircle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#6B9B8A",
    opacity: 0.02,
  },
  circle1: {
    width: 250,
    height: 250,
    top: -80,
    right: -60,
  },
  circle2: {
    width: 180,
    height: 180,
    bottom: 150,
    left: -50,
  },
  circle3: {
    width: 120,
    height: 120,
    top: 200,
    left: 40,
  },
  content: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#6B9B8A20",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C4A3E",
    letterSpacing: 0.5,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  illustrationCard: {
    width: width - 48,
    height: height * 0.38,
    borderRadius: 24,
    backgroundColor: "transparent",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
  },
  illustrationImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "25%",
    backgroundColor: "transparent",
  },
  statsBadge: {
    position: "absolute",
    bottom: -12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  statsBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2C4A3E",
  },
  textContent: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A2F26",
    textAlign: "center",
    letterSpacing: -0.3,
    marginBottom: 10,
    lineHeight: 28,
  },
  description: {
    fontSize: 13,
    color: "#5C6F65",
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.1,
    marginBottom: 20,
    maxWidth: width - 80,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 4,
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  featureText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#2C4A3E",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: "center",
  },
  ctaButton: {
    backgroundColor: "#6B9B8A",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6B9B8A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  footerText: {
    fontSize: 11,
    color: "#7A8A80",
    textAlign: "center",
    marginTop: 12,
    letterSpacing: 0.1,
  },
});