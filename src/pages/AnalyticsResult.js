import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AnalyticsResult({ route, navigation }) {
  const { result } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Factory Real-Time Insights</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Input Conditions Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="options-outline" size={24} color="#FFFFFF" style={styles.cardHeaderIcon} />
            <Text style={styles.cardTitle}>Conditions Input</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoLabel}>Temperature</Text>
            <Text style={styles.infoValue}>{result.temperature}°C</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoLabel}>Humidity</Text>
            <Text style={styles.infoValue}>{result.humidity}%</Text>
          </View>
        </View>

        {/* Warnings */}
        {result.warnings && result.warnings.length > 0 && (
          <View style={styles.warningCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="warning-outline" size={24} color="#D32F2F" style={styles.cardHeaderIcon} />
              <Text style={styles.warningTitle}>Warnings</Text>
            </View>
            {result.warnings.map((warning, index) => (
              <Text key={index} style={styles.warningText}>• {warning}</Text>
            ))}
          </View>
        )}

        {/* Condition Status */}
        <View style={styles.statusCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#2C2C2C" style={styles.cardHeaderIcon} />
            <Text style={styles.cardTitleBlack}>Condition Status</Text>
          </View>
          <Text style={styles.statusText}>{result.condition_status}</Text>
        </View>

        {/* Prediction Results */}
        <View style={styles.qualityCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="analytics-outline" size={24} color="#6B9B8A" style={styles.cardHeaderIcon} />
            <Text style={styles.cardTitleBlack}>Prediction Results</Text>
          </View>
          
          <View style={styles.predictionRow}>
            <Text style={styles.predictionLabel}>Predicted Yield:</Text>
            <Text style={styles.predictionValue}>{result.predicted_yield}%</Text>
          </View>

          <View style={styles.predictionRow}>
            <Text style={styles.predictionLabel}>Modeled Grade:</Text>
            <View style={styles.gradeBadge}>
               <Text style={styles.gradeText}>{result.predicted_grade}</Text>
            </View>
          </View>
        </View>

        {/* Recommended Action */}
        <View style={styles.actionCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="bulb-outline" size={24} color="#FFFFFF" style={styles.cardHeaderIcon} />
            <Text style={styles.cardTitle}>Recommended Action</Text>
          </View>
          <Text style={styles.actionText}>{result.action}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF5" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 40, paddingBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#2C2C2C" },
  backButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  placeholder: { width: 40 },
  scrollContent: { padding: 24 },
  card: { backgroundColor: "#6B9B8A", borderRadius: 20, padding: 20, marginBottom: 16 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  cardHeaderIcon: { marginRight: 8 },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  cardTitleBlack: { fontSize: 16, fontWeight: "600", color: "#2C2C2C" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  infoLabel: { fontSize: 14, color: "#E0E0E0" },
  infoValue: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
  warningCard: { backgroundColor: "#FFEBEE", borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#FFCDD2" },
  warningTitle: { fontSize: 16, fontWeight: "600", color: "#D32F2F" },
  warningText: { fontSize: 14, color: "#C62828", marginBottom: 5 },
  statusCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#E5E5E5" },
  statusText: { fontSize: 16, fontWeight: "500", color: "#455A64" },
  qualityCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#E5E5E5" },
  predictionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  predictionLabel: { fontSize: 15, color: "#7A8A80", fontWeight: "500" },
  predictionValue: { fontSize: 24, fontWeight: "bold", color: "#2C2C2C" },
  gradeBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, backgroundColor: "#4CAF50" },
  gradeText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  actionCard: { backgroundColor: "#2C3E50", borderRadius: 20, padding: 20, marginBottom: 16 },
  actionText: { fontSize: 16, color: "#FFFFFF", fontWeight: "500", lineHeight: 24 }
});
