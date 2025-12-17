import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Link, Stack } from "expo-router";

export default function Dashboard() {
  return (
    <>
      {/* Hide header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Scrollable Content */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Real-time Production Overview</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Today's Leaf Input</Text>
            <Text style={styles.statValue}>1008.3 kg</Text>
            <Text style={styles.statSubtext}>From 8 farmers</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.blueText]}>174.4 kg</Text>
            <Text style={styles.statSubtext}>Predicted Output</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.purpleText]}>127.8 kg</Text>
            <Text style={styles.statSubtext}>Actual Output</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.greenText]}>96.5%</Text>
            <Text style={styles.statSubtext}>Avg Accuracy</Text>
          </View>
        </View>

        {/* System Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Status</Text>

          <View style={styles.statusItem}>
            <View style={styles.statusLeft}>
              <View style={[styles.statusDot, styles.greenDot]} />
              <Text style={styles.statusLabel}>Leaf Load Cells</Text>
            </View>
            <Text style={styles.statusValue}>3 Active</Text>
          </View>

          <View style={styles.statusItem}>
            <View style={styles.statusLeft}>
              <View style={[styles.statusDot, styles.yellowDot]} />
              <Text style={styles.statusLabel}>Processing Batches</Text>
            </View>
            <Text style={[styles.statusValue, styles.yellowText]}>1 In Progress</Text>
          </View>

          <View style={styles.statusItem}>
            <View style={styles.statusLeft}>
              <View style={[styles.statusDot, styles.blueDot]} />
              <Text style={styles.statusLabel}>Ready for Output</Text>
            </View>
            <Text style={[styles.statusValue, styles.blueText]}>1 Batch</Text>
          </View>
        </View>

        {/* Recent Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Performance</Text>

          <View style={[styles.performanceCard, styles.greenCard]}>
            <View style={styles.performanceHeader}>
              <Text style={styles.batchId}>BATCH-2025-000</Text>
              <Text style={[styles.performanceValue, styles.greenText]}>+2.98%</Text>
            </View>
            <Text style={styles.performanceDate}>2025-10-21</Text>
            <Text style={styles.performanceSubtext}>vs predicted</Text>
          </View>

          <View style={[styles.performanceCard, styles.redCard]}>
            <View style={styles.performanceHeader}>
              <Text style={styles.batchId}>BATCH-2024-999</Text>
              <Text style={[styles.performanceValue, styles.redText]}>-7.59%</Text>
            </View>
            <Text style={styles.performanceDate}>2025-10-20</Text>
            <Text style={styles.performanceSubtext}>vs predicted</Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/dashboard" style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </Link>

        <Link href="/LiveCollection" style={styles.navItem}>
          <Text style={styles.navIcon}>⚖️</Text>
        </Link>

        <Link href="/ActiveBatches" style={styles.navItem}>
          <Text style={styles.navIcon}>📦</Text>
        </Link>

        <Link href="/CompletedBatches" style={styles.navItem}>
          <Text style={styles.navIcon}>📊</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    backgroundColor: "#10b981",
    padding: 24,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    marginTop: -20,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: "1%",
    elevation: 3,
  },

  statLabel: {
    fontSize: 12,
    color: "#6b7280",
  },

  statValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#10b981",
  },

  statSubtext: {
    fontSize: 11,
    color: "#9ca3af",
  },

  blueText: { color: "#3b82f6" },
  purpleText: { color: "#8b5cf6" },
  greenText: { color: "#10b981" },
  yellowText: { color: "#f59e0b" },
  redText: { color: "#ef4444" },

  section: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },

  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  greenDot: { backgroundColor: "#10b981" },
  yellowDot: { backgroundColor: "#f59e0b" },
  blueDot: { backgroundColor: "#3b82f6" },

  statusLabel: {
    fontSize: 14,
    color: "#4b5563",
  },

  statusValue: {
    fontSize: 14,
    fontWeight: "600",
  },

  performanceCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },

  greenCard: { backgroundColor: "#d1fae5" },
  redCard: { backgroundColor: "#fee2e2" },

  performanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  batchId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },

  performanceValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  performanceDate: {
    fontSize: 12,
    color: "#6b7280",
  },

  performanceSubtext: {
    fontSize: 11,
    color: "#9ca3af",
  },

  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  navIcon: {
    fontSize: 40,
  },
  navLabel: { fontSize: 12, color: "#6b7280", }, activeNav: { color: "#10b981", fontWeight: "bold", }, });

