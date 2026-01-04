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
  
  // 🔹 Mock extracted features (from your preview image)
  const extractedFeatures = {
    color: { L: 58.2, a: 3.7, b: 12.9 },
    texture: { contrast: 0.21, homogeneity: 0.89 },
    shape: { area: "12,340 px²", aspectRatio: 2.1 },
    status: "Healthy",
    grade: "Premium",
    margin: "Complete"
  };

  const handleBack = () => {
    router.replace("/"); 
  };

  // ✅ LEFT BUTTON → HOME PAGE
  

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
          <Ionicons name="chevron-back" size={24} color="#ecfdf5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tea Leaf Identification</Text>
        <View style={{ width: 36 }} />
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
            <View style={styles.placeholderImage}>
              <Ionicons name="leaf" size={60} color="#a7f3d0" />
              <Text style={styles.errorText}>No image provided</Text>
            </View>
          )}
          
          <Text style={styles.imageLabel}>Original Capture</Text>
        </View>
<View style={styles.resultHeader}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#16a34a"
            />
            <Text style={styles.resultTitle}>Identification Result</Text>
          </View>
        {/* Result Card */}
        <View style={styles.resultCard}>
          
          
          <View style={styles.resultStatus}>
            <View style={[styles.statusBadge, styles.successBadge]}>
              <Ionicons name="leaf" size={16} color="#ffffff" />
              <Text style={styles.statusText}>Tea Leaf Confirmed</Text>
            </View>
            <Text style={styles.resultDescription}>
              Leaf verified successfully. Suitable for quality analysis.
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        {/* LEFT → RETTAKE */}
        <TouchableOpacity
          style={[styles.secondaryButton, styles.buttonHalf]}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Ionicons name="home-outline" size={18} color="#ffffffff" />
                      <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity>

        {/* RIGHT → PREDICT QUALITY */}
        <TouchableOpacity
          style={[styles.mainButton, styles.buttonHalf]}
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={!imageUri}
        >
          <Ionicons name="analytics" size={20} color="#ffffffff" />
          <Text style={styles.mainButtonText}>Go To Next Step</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}