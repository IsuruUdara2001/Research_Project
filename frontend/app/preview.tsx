// frontend/app/preview.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/previewStyles";

//  Change this to whatever IP Flask prints (http://<your-ip>:8000)
const API_BASE_URL = "http://192.168.6.9:8000";


export default function PreprocessingPreviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ uri?: string }>();
  const imageUri = params.uri;
  const [isLoading, setIsLoading] = useState(false);

  const handlePredictQuality = async () => {
    if (!imageUri) return;

    try {
      setIsLoading(true);

      // --- Build multipart/form-data body ---
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "leaf.jpg",
        type: "image/jpeg",
      } as any);
      formData.append("user_id", "demo-user");
      formData.append("device_id", "my-phone");

      // --- Call Flask backend ---
      const response = await fetch(`${API_BASE_URL}/api/scan`, {
        method: "POST",
        // ⚠️ Do NOT set Content-Type manually for FormData in React Native
        body: formData,
      });

      const json = await response.json();
      if (!response.ok) {
        console.log("Backend error:", json);
        Alert.alert("Prediction failed", json.error || "Server error");
        return;
      }

      const scan = json.scan;
      console.log("Prediction result from backend:", scan);

      // 👉 At this point the document is stored in Firestore (collection "scans")

      // Navigate to Result page with real prediction
      router.push({
        pathname: "/result",
        params: {
          uri: imageUri,
          grade: scan.grade,
          confidence: String(scan.confidence),
          id: scan.id,
        },
      });
    } catch (error) {
      console.warn("Predict error:", error);
      Alert.alert("Error", "Could not connect to server. Check IP & Wi-Fi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetake = () => {
    router.replace("/camera");
  };

  const handleBack = () => {
    router.back();
  };

  if (!imageUri) {
    // If user somehow came here without an image
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={40} color="#f97316" />
          <Text style={styles.errorText}>
            No image found for preprocessing. Please capture a leaf again.
          </Text>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleRetake}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={20} color="#F6EFE5" />
            <Text style={styles.mainButtonText}>Go to Camera</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#ecfdf5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preprocessing Preview</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image preview */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: imageUri }}
            style={styles.leafImage}
            resizeMode="cover"
          />
          <Text style={styles.imageLabel}>Captured Tea Leaf</Text>
        </View>

        {/* Feature summary cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extracted Features (Preview)</Text>

          {/* Color */}
          <View style={styles.featureCard}>
            <View style={styles.featureHeaderRow}>
              <Ionicons name="color-palette" size={20} color="#ffffffff" />
              <Text style={styles.featureTitle}>Color (CIELAB)</Text>
            </View>
            <Text style={styles.featureText}>
              L*: <Text style={styles.featureValue}>58.2</Text> &nbsp; a*:{" "}
              <Text style={styles.featureValue}>3.7</Text> &nbsp; b*:{" "}
              <Text style={styles.featureValue}>12.9</Text>
            </Text>
            <Text style={styles.featureHint}>
              Indicates brightness and green–red / blue–yellow balance of leaf.
            </Text>
          </View>

          {/* Texture */}
          <View style={styles.featureCard}>
            <View style={styles.featureHeaderRow}>
              <Ionicons name="grid" size={20} color="#ffffffff" />
              <Text style={styles.featureTitle}>Texture (GLCM)</Text>
            </View>
            <Text style={styles.featureText}>
              Contrast: <Text style={styles.featureValue}>0.21</Text> &nbsp;
              Homogeneity: <Text style={styles.featureValue}>0.89</Text>
            </Text>
            <Text style={styles.featureHint}>
              Smooth texture with low noise – typical of healthy leaves.
            </Text>
          </View>

          {/* Shape & Size */}
          <View style={styles.featureCard}>
            <View style={styles.featureHeaderRow}>
              <Ionicons name="resize" size={20} color="#ffffffff" />
              <Text style={styles.featureTitle}>Shape &amp; Size</Text>
            </View>
            <Text style={styles.featureText}>
              Area: <Text style={styles.featureValue}>12 340 px²</Text> &nbsp;
              Aspect Ratio: <Text style={styles.featureValue}>2.1</Text>
            </Text>
            <Text style={styles.featureHint}>
              Long, narrow leaf with complete margins – suitable for premium
              grades.
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.secondaryButton, styles.buttonHalf]}
            onPress={handleRetake}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Ionicons name="camera-reverse" size={18} color="#ffffffff" />
            <Text style={styles.secondaryButtonText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mainButton, styles.buttonHalf]}
            onPress={handlePredictQuality}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffffff" />
            ) : (
              <>
                <Ionicons name="sparkles" size={18} color="#F6EFE5" />
                <Text style={styles.mainButtonText}>Predict Quality</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
