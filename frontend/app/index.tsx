// frontend/app/index.tsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker"; // ✅ Correct import
import { styles } from "./styles/homeDashboardStyles";
import { useAppSettings } from "../context/AppSettingsContext";

type QualityStat = {
  label: string;
  value: number;
  color: string;
};

const MOCK_STATS: QualityStat[] = [
  { label: "Premium", value: 34, color: "#22c55e" },
  { label: "High", value: 46, color: "#0ea5e9" },
  { label: "Medium", value: 21, color: "#eab308" },
  { label: "Low", value: 12, color: "#f97316" },
];

export default function HomeDashboard() {
  const router = useRouter();
  const { theme, toggleTheme } = useAppSettings();
  const isDark = theme === "dark";

  const totalToday = MOCK_STATS.reduce((sum, s) => sum + s.value, 0);
  const lastGrade = "Premium";
  const lastConfidence = 93;

  const palette = isDark
    ? {
        bg: "#6B9B8A",
        card: "#064e3b",
        cardHighlight: "#bbf7d0",
        text: "#ecfdf5",
        textSoft: "#a7f3d0",
        textMuted: "#9ca3af",
        chipText: "#ecfdf5",
        quickCard: "#020617",
        footer: "#9ca3af",
      }
    : {
        bg: "#f1f5f9",
        card: "#ffffff",
        cardHighlight: "#a7f3d0",
        text: "#020617",
        textSoft: "#0f766e",
        textMuted: "#4b5563",
        chipText: "#ffffff",
        quickCard: "#e5e7eb",
        footer: "#4b5563",
      };

  // Navigation handlers
  const handleStartScan = () => router.push("/camera");
  const handleGoToHistory = () => router.push("/history");
  const handleGoToAnalytics = () => router.push("/analytics");
  const handleGoToBatches = () => router.push("/batches");

  // Image upload handler
  const handleUploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "We need access to your media library to upload images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

     if (!result.canceled) {
    const selectedUri = result.assets[0].uri;
    // Navigate to identify page with image URI
    router.push({
      pathname: "/identify",
      params: { imageUri: selectedUri },
    });
  }
};

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.bg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={[styles.root, { backgroundColor: palette.bg }]}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greetingText, { fontSize: 22, color: palette.text }]}>
              Smart Tea Quality
            </Text>
            <Text style={[styles.subtitleText, { fontSize: 14, color: palette.textSoft }]}>
              Pre-Processing Dashboard
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Theme toggle */}
            <TouchableOpacity activeOpacity={0.8} onPress={toggleTheme}>
              <View
                style={{
                  width: 70,
                  height: 32,
                  borderRadius: 16,
                  padding: 4,
                  marginRight: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: isDark ? "flex-start" : "flex-end",
                  backgroundColor: isDark ? "#e5e7eb" : "#0f172a",
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: isDark ? "#0f172a" : "#f9fafb",
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* Profile avatar */}
            <View style={[styles.userAvatar, { backgroundColor: isDark ? "#064e3b" : "#d1fae5" }]}>
              <Text style={[styles.userInitials, { fontSize: 13, color: palette.text }]}>
                NG
              </Text>
            </View>
          </View>
        </View>

        {/* CONTENT */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Today summary card */}
          <View style={[styles.cardPrimary, { backgroundColor: palette.card }]}>
            <View style={styles.cardPrimaryRow}>
              <View>
                <Text style={[styles.cardPrimaryLabel, { fontSize: 13, color: palette.textSoft }]}>
                  Today&apos;s Scans
                </Text>
                <Text style={[styles.cardPrimaryValue, { fontSize: 26, color: palette.text }]}>
                  {totalToday}
                </Text>
              </View>
              <Ionicons name="leaf" size={40} color={isDark ? "#bbf7d0" : "#047857"} />
            </View>

            {/* Chips */}
            <View style={styles.chipRow}>
              <View style={styles.chip}>
                <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
                <Text
                  style={[styles.chipText, { fontSize: 13, color: isDark ? palette.chipText : "#ffffff" }]}
                >
                  Last grade: {lastGrade}
                </Text>
              </View>

              <View style={styles.chip}>
                <Ionicons name="stats-chart" size={16} color="#0ea5e9" />
                <Text
                  style={[styles.chipText, { fontSize: 13, color: isDark ? palette.chipText : "#ffffff" }]}
                >
                  Confidence: {lastConfidence}%
                </Text>
              </View>
            </View>

            {/* Start Scan Button */}
            <TouchableOpacity
              style={[styles.mainButton, { backgroundColor: palette.cardHighlight }]}
              onPress={handleStartScan}
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={20} color="#6B9B8A" />
              <Text style={[styles.mainButtonText, { fontSize: 13, color: "#6B9B8A" }]}>
                Start Leaf Scan
              </Text>
            </TouchableOpacity>

            {/* Upload Image Button */}
            <TouchableOpacity
              style={[
                styles.mainButton,
                {
                  backgroundColor: isDark ? "#0f172a" : "#a5f3fc",
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
              onPress={handleUploadImage}
              activeOpacity={0.8}
            >
              <Ionicons name="cloud-upload-outline" size={20} color={isDark ? "#ecfdf5" : "#6B9B8A"} />
              <Text
                style={[
                  styles.mainButtonText,
                  { fontSize: 13, color: isDark ? "#ecfdf5" : "#6B9B8A", marginLeft: 6 },
                ]}
              >
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quality Distribution */}
          <View
            style={[
              styles.section,
              {
                backgroundColor: isDark ? "transparent" : "#e2f3ec",
                borderRadius: isDark ? 0 : 18,
                paddingHorizontal: isDark ? 0 : 12,
                paddingVertical: isDark ? 0 : 14,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { fontSize: 15, color: palette.text }]}>
              Quality Distribution (Today)
            </Text>

            <View style={styles.qualityRow}>
              {MOCK_STATS.map((stat) => (
                <View key={stat.label} style={styles.qualityItem}>
                  <View style={[styles.qualityCircle, { backgroundColor: stat.color }]} />
                  <Text style={[styles.qualityLabel, { fontSize: 13, color: isDark ? "#f9fafb" : "#ffffff" }]}>
                    {stat.label}
                  </Text>
                  <Text style={[styles.qualityValue, { fontSize: 13, color: isDark ? "#f9fafb" : "#ffffff" }]}>
                    {stat.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 15, color: isDark ? palette.text : "#ffffff" }]}>
              Quick Actions
            </Text>

            {/* Row 1 */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionCard, { backgroundColor: palette.quickCard }]} onPress={handleGoToHistory}>
                <Ionicons name="time" size={26} color="#0f766e" />
                <Text style={[styles.actionTitle, { fontSize: 13, color: palette.text }]}>History</Text>
                <Text style={[styles.actionSubtitle, { fontSize: 13, color: isDark ? palette.textMuted : "#000000" }]}>
                  Recent predictions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionCard, { backgroundColor: palette.quickCard }]} onPress={handleGoToAnalytics}>
                <Ionicons name="analytics" size={26} color="#7c2d12" />
                <Text style={[styles.actionTitle, { fontSize: 13, color: palette.text }]}>Analytics</Text>
                <Text style={[styles.actionSubtitle, { fontSize: 13, color: isDark ? palette.textMuted : "#000000" }]}>
                  Trends & insights
                </Text>
              </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionCard, { backgroundColor: palette.quickCard }]} onPress={handleGoToBatches}>
                <Ionicons name="cube" size={26} color="#1d4ed8" />
                <Text style={[styles.actionTitle, { fontSize: 13, color: palette.text }]}>Batches</Text>
                <Text style={[styles.actionSubtitle, { fontSize: 13, color: isDark ? palette.textMuted : "#000000" }]}>
                  Assign & review
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Ionicons name="information-circle-outline" size={18} color={palette.textMuted} />
            <Text style={[styles.footerText, { fontSize: 13, color: palette.footer }]}>
              Use “Start Leaf Scan” to capture tea leaves. Predictions are based on color, texture, shape and size features.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
