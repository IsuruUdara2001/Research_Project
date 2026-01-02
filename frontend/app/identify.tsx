import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/identifyStyles";

export default function IdentifyPage() {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();

  // 🔹 Mock ML result (replace later with real API)
  const isTeaLeaf = true;

  const handleBack = () => {
    router.back();
  };

  // ✅ LEFT BUTTON → HOME PAGE
  const handleGoHome = () => {
    router.replace("/"); // Home Dashboard
  };

  const handleNext = () => {
    if (!isTeaLeaf) {
      Alert.alert(
        "Invalid Image",
        "This image is not identified as a tea leaf. Please upload a valid leaf."
      );
      return;
    }

    router.push({
      pathname: "/preview",
      params: { uri: imageUri },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#ecfdf5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tea Leaf Identification</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Card */}
        <View style={styles.imageCard}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.errorText}>No image provided</Text>
          )}
          <Text style={styles.imageLabel}>Captured Leaf Image</Text>
        </View>

        {/* Result Card */}
        <View
          style={[
            styles.resultCard,
            isTeaLeaf ? styles.successCard : styles.errorCard,
          ]}
        >
          <Ionicons
            name={isTeaLeaf ? "leaf" : "close-circle"}
            size={28}
            color={isTeaLeaf ? "#16a34a" : "#dc2626"}
          />
          <Text
            style={[
              styles.resultText,
              { color: isTeaLeaf ? "#16a34a" : "#dc2626" },
            ]}
          >
            {isTeaLeaf
              ? "This image contains a Tea Leaf"
              : "This image is NOT a Tea Leaf"}
          </Text>
          <Text style={styles.resultHint}>
            {isTeaLeaf
              ? "Leaf verified successfully. You may proceed."
              : "Please upload a valid tea leaf image."}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        {/* LEFT → HOME */}
        <TouchableOpacity
          style={[styles.secondaryButton, styles.buttonHalf]}
          onPress={handleGoHome}
          activeOpacity={0.8}
        >
          <Ionicons name="home" size={18} color="#e5e7eb" />
          <Text style={styles.secondaryButtonText}>Home</Text>
        </TouchableOpacity>

        {/* RIGHT → NEXT */}
        <TouchableOpacity
          style={[styles.mainButton, styles.buttonHalf]}
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={!imageUri}
        >
          <Ionicons name="arrow-forward" size={18} color="#022c22" />
          <Text style={styles.mainButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
