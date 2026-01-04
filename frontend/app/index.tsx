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
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles/homeDashboardStyles";

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

  const totalToday = MOCK_STATS.reduce((sum, s) => sum + s.value, 0);
  const lastGrade = "Premium";
  const lastConfidence = 93;

  // ✅ Fixed palette (theme removed)
  const palette = {
    bg: "#F6EFE5",
    card: "#E8F6E9",
    cardHighlight: "##62917F",
    text: "#020617",
    textSoft: "#090516ff",
    textMuted: "#000000ff",
    chipText: "#0a0000ff",
    quickCard: "#629181",
    footer: "#4b5563",
  };

  // Navigation handlers
  const handleStartScan = () => router.push("/camera");
  const handleGoToHistory = () => router.push("/history");
  const handleGoToAnalytics = () => router.push("/analytics");
  

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
      router.push({
        pathname: "/identify",
        params: { imageUri: selectedUri },
      });
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.bg }]}>
      <StatusBar barStyle="dark-content" />

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

          {/* Profile avatar */}
          <View style={[styles.userAvatar, { backgroundColor: "#d1fae5" }]}>
            <Text style={[styles.userInitials, { fontSize: 13, color: palette.text }]}>
              NG
            </Text>
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
              <Ionicons name="leaf" size={40} color="#047857" />
            </View>

            {/* Chips */}
            <View style={styles.chipRow}>
  <View style={styles.chipResponsive}>
    <Ionicons name="checkmark-circle" size={16} color="#ffffffff" />
    <Text style={styles.chipTextResponsive}>
      Last grade: {lastGrade}
    </Text>
  </View>

  <View style={styles.chipResponsive}>
    <Ionicons name="stats-chart" size={16} color="#ffffffff" />
    <Text style={styles.chipTextResponsive}>
      Confidence: {lastConfidence}%
    </Text>
  </View>
</View>


            {/* Start Scan Button */}
            <TouchableOpacity
              style={[
                styles.mainButton,
                {
                  backgroundColor: "#629181",
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
              onPress={handleStartScan}
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={20} color="#ffffffff" />
              <Text style={[styles.mainButtonText, { fontSize: 13, color: "#F6EFE5" }]}>
                Start Leaf Scan
              </Text>
            </TouchableOpacity>

            {/* Upload Image Button */}
            <TouchableOpacity
              style={[
                styles.mainButton,
                {
                  backgroundColor: "#629181",
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
              onPress={handleUploadImage}
              activeOpacity={0.8}
            >
              <Ionicons name="cloud-upload-outline" size={20} color="#ffffffff" />
              <Text
                style={[
                  styles.mainButtonText,
                  { fontSize: 13, color: "#ffffffff", marginLeft: 6 },
                ]}
              >
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quality Distribution */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 15, color: palette.text }]}>
              Quality Distribution (Today)
            </Text>

            <View style={styles.qualityRow}>
              {MOCK_STATS.map((stat) => (
                <View key={stat.label} style={styles.qualityItem}>
                  <View style={[styles.qualityCircle, { backgroundColor: stat.color }]} />
                  <Text style={[styles.qualityLabel, { fontSize: 13, color: "#000000ff" }]}>
                    {stat.label}
                  </Text>
                  <Text style={[styles.qualityValue, { fontSize: 13, color: "#000000ff" }]}>
                    {stat.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 15, color: "#000000ff" }]}>
              Quick Actions
            </Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionCard, { backgroundColor: palette.quickCard }]} onPress={handleGoToHistory}>
                <Ionicons name="time" size={26} color="#ffffffff" />
                <Text style={[styles.actionTitle, { fontSize: 13, color: "#ffffffff" }]}>History</Text>
                <Text style={[styles.actionSubtitle, { fontSize: 13, color: "#ffffffff" }]}>
                  Recent predictions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionCard, { backgroundColor: palette.quickCard }]} onPress={handleGoToAnalytics}>
                <Ionicons name="analytics" size={26} color="#ffffffff" />
                <Text style={[styles.actionTitle, { fontSize: 13, color: "#ffffffff" }]}>Analytics</Text>
                <Text style={[styles.actionSubtitle, { fontSize: 13, color: "#ffffffff" }]}>
                  Trends & insights
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
