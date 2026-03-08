import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Realistic dummy alerts for Tea Quality + Sensor Monitoring
const dummyAlerts = [
  {
    id: "A1",
    title: "Humidity Out of Range",
    message: "Humidity reached 92%. Above safe range (40–90%). Check ventilation.",
    createdAt: "2026-01-05T09:24:00.000Z",
    status: "unread",
    severity: "critical",
    source: "sensor",
  },
  {
    id: "A2",
    title: "Temperature Trending High",
    message: "Temperature is rising and near limit: 31.5°C. Monitor the next 10 minutes.",
    createdAt: "2026-01-05T08:50:00.000Z",
    status: "unread",
    severity: "warning",
    source: "sensor",
  },
  {
    id: "A3",
    title: "Premium Zone Achieved",
    message: "Temp 26°C and Humidity 80%. Conditions match premium target zone.",
    createdAt: "2026-01-05T07:40:00.000Z",
    status: "read",
    severity: "info",
    source: "model",
  },
  {
    id: "A4",
    title: "Prediction Risk Detected",
    message: "Model indicates higher chance of lower leaf grade for this batch. Review drying schedule.",
    createdAt: "2026-01-05T06:30:00.000Z",
    status: "unread",
    severity: "warning",
    source: "model",
  },
  {
    id: "A5",
    title: "Sensor Offline",
    message: "No readings received for 8 minutes from Sensor #02. Check power or Wi-Fi.",
    createdAt: "2026-01-05T05:12:00.000Z",
    status: "unread",
    severity: "critical",
    source: "system",
  },
];

export default function Alerts({ navigation }) {
  // Local state for alerts (copy, sorted newest first)
  const [alerts, setAlerts] = useState(() =>
    [...dummyAlerts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );

  // mark an alert as read (local state only)
  const markAsRead = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "read" } : a))
    );
  };

  const renderStatusText = (status) => (status === "unread" ? "Unread" : "Read");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alerts</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {alerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            activeOpacity={0.85}
            onPress={() => markAsRead(alert.id)}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons name="alert-circle" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.cardTitleWrap}>
                <Text style={styles.cardTitle}>{alert.title}</Text>
                <Text style={styles.cardMeta}>{new Date(alert.createdAt).toLocaleString()}</Text>
              </View>
              <View style={styles.cardStatusWrap}>
                <Text style={styles.cardStatusText}>{renderStatusText(alert.status)}</Text>
                <Text style={styles.cardSeverityText}>{alert.severity}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardMessage}>{alert.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#6B9B8A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitleWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C2C2C",
  },
  cardMeta: {
    fontSize: 12,
    color: "#7A8A80",
    marginTop: 4,
  },
  cardStatusWrap: {
    alignItems: "flex-end",
  },
  cardStatusText: {
    fontSize: 12,
    color: "#6B9B8A",
    fontWeight: "600",
  },
  cardSeverityText: {
    fontSize: 12,
    color: "#7A8A80",
    marginTop: 4,
  },
  cardBody: {
    marginTop: 12,
  },
  cardMessage: {
    fontSize: 13,
    color: "#4A4A4A",
  },
});
