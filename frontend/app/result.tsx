// frontend/app/result.tsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/predictionResultStyles";

type ResultParams = {
  uri?: string;
  grade?: string;
  confidence?: string; // send as string or number, we will format
};

export default function PredictionResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<ResultParams>();

  const imageUri = params.uri;
  const grade = params.grade || "Premium";
  const confidence = params.confidence || "93";

  const handleScanAgain = () => {
    router.replace("/camera");
  };

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoHome}
          activeOpacity={0.7}
        >
          <Ionicons name="home" size={20} color="#ecfdf5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prediction Result</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Optional leaf image */}
        {imageUri && (
          <View style={styles.imageCard}>
            <Image
              source={{ uri: imageUri }}
              style={styles.leafImage}
              resizeMode="cover"
            />
            <Text style={styles.imageLabel}>Analyzed Tea Leaf</Text>
          </View>
        )}

        {/* Main result card */}
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Predicted Grade</Text>
          <View style={styles.gradeRow}>
            <Ionicons name="ribbon" size={26} color="#22c55e" />
            <Text style={styles.gradeText}>{grade}</Text>
          </View>

          <View style={styles.confidenceChip}>
            <Ionicons name="stats-chart" size={16} color="#f97316" />
            <Text style={styles.confidenceText}>
              Confidence:{" "}
              <Text style={styles.confidenceValue}>{confidence}%</Text>
            </Text>
          </View>

          <Text style={styles.resultHint}>
            This grade is estimated using color, texture, shape and size
            features extracted from the leaf image.
          </Text>
        </View>

        {/* Feature summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feature Summary</Text>

          <View style={styles.featureCard}>
            <View style={styles.featureHeaderRow}>
              <Ionicons name="color-palette" size={20} color="#22c55e" />
              <Text style={styles.featureTitle}>Color Score</Text>
            </View>
            <Text style={styles.featureText}>
              Leaf shows strong green tones with healthy brightness. Indicates
              properly grown and well-preserved material suitable for{" "}
              <Text style={styles.featureHighlight}>{grade}</Text> grade.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureHeaderRow}>
              <Ionicons name="grid" size={20} color="#0ea5e9" />
              <Text style={styles.featureTitle}>Texture &amp; Surface</Text>
            </View>
            <Text style={styles.featureText}>
              Fine and uniform texture with low noise. Suggests careful
              handling and minimal defects on the leaf surface.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureHeaderRow}>
              <Ionicons name="resize" size={20} color="#eab308" />
              <Text style={styles.featureTitle}>Shape &amp; Size</Text>
            </View>
            <Text style={styles.featureText}>
              Leaf size and aspect ratio are within the expected range for high
              quality categories. Overall geometry is consistent and complete.
            </Text>
          </View>
        </View>

        {/* Recommendation card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendation</Text>
          <View style={styles.recommendCard}>
            <Ionicons name="bulb" size={22} color="#22c55e" />
            <View style={{ flex: 1 }}>
              <Text style={styles.recommendTitle}>Batch Suggestion</Text>
              <Text style={styles.recommendText}>
                Assign this leaf to{" "}
                <Text style={styles.featureHighlight}>{grade}</Text> batch or
                higher-quality blend. Keep away from low-grade / dust batches.
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.secondaryButton, styles.buttonHalf]}
            onPress={handleGoHome}
            activeOpacity={0.85}
          >
            <Ionicons name="home-outline" size={18} color="#e5e7eb" />
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mainButton, styles.buttonHalf]}
            onPress={handleScanAgain}
            activeOpacity={0.85}
          >
            <Ionicons name="camera" size={18} color="#022c22" />
            <Text style={styles.mainButtonText}>Scan Another Leaf</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
