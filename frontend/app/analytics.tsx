// frontend/app/analytics.tsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles/analyticsStyles";

type QualityStat = {
  label: string;
  value: number;
  color: string;
};

const QUALITY_DISTRIBUTION: QualityStat[] = [
  { label: "Premium", value: 34, color: "#22c55e" },
  { label: "High", value: 46, color: "#0ea5e9" },
  { label: "Medium", value: 21, color: "#eab308" },
  { label: "Low", value: 12, color: "#f97316" },
];

export default function AnalyticsDashboard() {
  const router = useRouter();

  const totalScansToday = 113;
  const premiumRatio = 34; // %
  const avgConfidence = 91; // %
  const weeklyScans = [14, 20, 18, 26, 22, 19, 24]; // dummy data

  const handleBack = () => {
    router.back();
  };

  const maxWeekly = Math.max(...weeklyScans, 1);

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
        <Text style={styles.headerTitle}>Analytics Dashboard</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top summary cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Today&apos;s Scans</Text>
            <View style={styles.summaryMainRow}>
              <Ionicons name="leaf" size={24} color="#ffffffff" />
              <Text style={styles.summaryValue}>{totalScansToday}</Text>
            </View>
            <Text style={styles.summarySub}>Across all grades</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Premium Ratio</Text>
            <View style={styles.summaryMainRow}>
              <Ionicons name="ribbon" size={24} color="#ffffffff" />
              <Text style={styles.summaryValue}>{premiumRatio}%</Text>
            </View>
            <Text style={styles.summarySub}>of today&apos;s scans</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { flex: 1 }]}>
            <Text style={styles.summaryLabel}>Average Confidence</Text>
            <View style={styles.summaryMainRow}>
              <Ionicons name="stats-chart" size={24} color="#ffffffff" />
              <Text style={styles.summaryValue}>{avgConfidence}%</Text>
            </View>
            <Text style={styles.summarySub}>Model prediction strength</Text>
          </View>
        </View>

        {/* Quality distribution (bar-like) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quality Distribution (Today)</Text>
          <View style={styles.qualityContainer}>
            {QUALITY_DISTRIBUTION.map((item) => (
              <View key={item.label} style={styles.qualityItemRow}>
                <View style={styles.qualityLabelRow}>
                  <View
                    style={[
                      styles.qualityDot,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.qualityLabel}>{item.label}</Text>
                </View>
                <View style={styles.qualityBarBackground}>
                  <View
                    style={[
                      styles.qualityBarFill,
                      {
                        width: `${(item.value / 50) * 100}%`, // scale
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.qualityValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly scans mini chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Scans Overview</Text>
          <View style={styles.weeklyChart}>
            {weeklyScans.map((value, index) => {
              const height = (value / maxWeekly) * 70;
              const labels = ["M", "T", "W", "T", "F", "S", "S"];

              return (
                <View key={index} style={styles.weeklyBarItem}>
                  <View style={[styles.weeklyBar, { height }]} />
                  <Text style={styles.weeklyBarLabel}>{labels[index]}</Text>
                </View>
              );
            })}
          </View>
          
        </View>

        {/* Insights cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>

          <View style={styles.insightCard}>
            <Ionicons name="trending-up" size={20} color="#22c55e" />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Premium trend</Text>
              <Text style={styles.insightText}>
                Premium grade share is stable with slight upward movement. This
                indicates consistent raw material quality.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <Ionicons name="alert-circle" size={20} color="#f97316" />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Low grade alerts</Text>
              <Text style={styles.insightText}>
                Low grade leaves exceed 10% of today&apos;s scans. Inspect
                upstream plucking and handling process.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <Ionicons name="bulb" size={20} color="#eab308" />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Batch optimization</Text>
              <Text style={styles.insightText}>
                Consider creating dedicated batches for High and Premium grades
                to improve consistency in final tea blends.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
