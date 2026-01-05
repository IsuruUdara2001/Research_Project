import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Reports({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [selectedMonth, setSelectedMonth] = useState("December");
  const [selectedYear, setSelectedYear] = useState("2024");

  // Sample data for reports
  const reportData = {
    Daily: {
      // Environment-aware KPIs for the daily report
      predictionConfidence: 88.5,
      environmentStatus: "Optimal",
      avgTemp: 26.0,
      avgHumidity: 80,
      totalSensorReadings: 1420,
      predictedQuality: "High",
      date: "23/12/2024",
      topRiskPeriods: [
        {
          id: "R1",
          timeRange: "02:00 - 04:00",
          temp: "28.5°C",
          humidity: 92,
          predictedQuality: "Low",
          confidence: 64.2,
          alerts: ["High humidity"],
        },
        {
          id: "R2",
          timeRange: "13:00 - 15:00",
          temp: "33.2°C",
          humidity: 78,
          predictedQuality: "Medium",
          confidence: 70.1,
          alerts: ["High temperature"],
        },
      ],
      bestQualityPeriods: [
        {
          id: "B1",
          timeRange: "06:00 - 08:00",
          temp: "24.0°C",
          humidity: 68,
          predictedQuality: "High",
          confidence: 91.3,
          alerts: [],
        },
        {
          id: "B2",
          timeRange: "20:00 - 22:00",
          temp: "23.5°C",
          humidity: 65,
          predictedQuality: "Premium",
          confidence: 94.2,
          alerts: [],
        },
      ],
    },
    Weekly: {
      predictionConfidence: 82.1,
      environmentStatus: "Warning",
      avgTemp: 25.8,
      avgHumidity: 74,
      totalSensorReadings: 8900,
      predictedQuality: "Standard",
      dateRange: "17/12/2024 - 23/12/2024",
      topRiskPeriods: [
        { id: "R1", timeRange: "Mon 02:00 - 04:00", temp: "29.1°C", humidity: 91, predictedQuality: "Low", confidence: 63.5, alerts: ["High humidity"] },
      ],
      bestQualityPeriods: [
        { id: "B1", timeRange: "Fri 06:00 - 08:00", temp: "24.2°C", humidity: 66, predictedQuality: "High", confidence: 90.1, alerts: [] },
      ],
    },
    Monthly: {
      predictionConfidence: 79.4,
      environmentStatus: "Warning",
      avgTemp: 26.4,
      avgHumidity: 72,
      totalSensorReadings: 36000,
      predictedQuality: "Standard",
      dateRange: "01/12/2024 - 31/12/2024",
      topRiskPeriods: [
        { id: "R1", timeRange: "Week 2 (Various)", temp: "30.5°C", humidity: 88, predictedQuality: "Low", confidence: 60.2, alerts: ["High humidity","High temperature"] },
      ],
      bestQualityPeriods: [
        { id: "B1", timeRange: "Week 4 (Various)", temp: "24.0°C", humidity: 66, predictedQuality: "Premium", confidence: 92.4, alerts: [] },
      ],
    },
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2024", "2023", "2022", "2021"];

  const currentReport = reportData[selectedPeriod];

  const handleDownloadPDF = () => {
    Alert.alert(
      "Download Report",
      `Download ${selectedPeriod} Report as PDF?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Download",
          onPress: () => {
            Alert.alert(
              "Success",
              `${selectedPeriod} report downloaded successfully!`
            );
          },
        },
      ]
    );
  };

  const handleEmailReport = () => {
    Alert.alert("Email Report", `Send ${selectedPeriod} Report via email?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Send",
        onPress: () => {
          Alert.alert("Success", "Report sent successfully!");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reports</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {["Daily", "Weekly", "Monthly"].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period && styles.periodTextActive,
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Range Selector for Monthly */}
        {selectedPeriod === "Monthly" && (
          <View style={styles.dateFilterContainer}>
            <View style={styles.dateFilter}>
              <Text style={styles.dateFilterLabel}>Month:</Text>
              <View style={styles.dateFilterValue}>
                <Text style={styles.dateFilterText}>{selectedMonth}</Text>
                <Ionicons name="chevron-down" size={16} color="#6B9B8A" />
              </View>
            </View>
            <View style={styles.dateFilter}>
              <Text style={styles.dateFilterLabel}>Year:</Text>
              <View style={styles.dateFilterValue}>
                <Text style={styles.dateFilterText}>{selectedYear}</Text>
                <Ionicons name="chevron-down" size={16} color="#6B9B8A" />
              </View>
            </View>
          </View>
        )}

        {/* Report Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="document-text" size={24} color="#6B9B8A" style={styles.summaryIcon} />
            <Text style={styles.summaryTitle}>{selectedPeriod} Summary</Text>
          </View>

          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Prediction Confidence</Text>
                <Text style={styles.summaryValue}>
                  {currentReport.predictionConfidence}%
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Environment Status</Text>
                <Text style={styles.summaryValue}>{currentReport.environmentStatus}</Text>
              </View>
            </View>

            <View style={styles.summaryDividerHorizontal} />

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Predicted Tea Quality</Text>
              <Text style={styles.summaryValueLarge}>{currentReport.predictedQuality}</Text>
            </View>

            <View style={styles.dateRangeContainer}>
              <Ionicons name="calendar-outline" size={16} color="#7A8A80" style={{ marginRight: 6 }} />
              <Text style={styles.dateRangeText}>
                {currentReport.date || currentReport.dateRange}
              </Text>
            </View>
          </View>
        </View>

        {/* Top Risk Periods & Best Quality Periods */}
        <View style={styles.performersCard}>
          <Text style={styles.performersTitle}>Top Risk Periods</Text>
          <View style={styles.performersList}>
            {currentReport.topRiskPeriods.map((p, index) => (
              <View key={p.id} style={styles.performerItem}>
                <View style={styles.performerRank}>
                  <Text style={styles.performerRankText}>{index + 1}</Text>
                </View>
                <View style={styles.performerInfo}>
                  <Text style={styles.performerName}>{p.timeRange}</Text>
                  <Text style={styles.performerId}>Temp: {p.temp} • Humidity: {p.humidity}%</Text>
                </View>
                <View style={styles.performerSupply}>
                  <Text style={styles.performerSupplyValue}>{p.predictedQuality}</Text>
                  <Text style={styles.performerSmall}>Conf: {p.confidence}%</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={[styles.performersTitle, { marginTop: 16 }]}>Best Quality Periods</Text>
          <View style={styles.performersList}>
            {currentReport.bestQualityPeriods.map((p, index) => (
              <View key={p.id} style={styles.performerItem}>
                <View style={styles.performerRank}>
                  <Text style={styles.performerRankText}>{index + 1}</Text>
                </View>
                <View style={styles.performerInfo}>
                  <Text style={styles.performerName}>{p.timeRange}</Text>
                  <Text style={styles.performerId}>Temp: {p.temp} • Humidity: {p.humidity}%</Text>
                </View>
                <View style={styles.performerSupply}>
                  <Text style={styles.performerSupplyValue}>{p.predictedQuality}</Text>
                  <Text style={styles.performerSmall}>Conf: {p.confidence}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="thermometer" size={32} color="#66BB6A" />
            <Text style={styles.statValue}>{currentReport.avgTemp}°C</Text>
            <Text style={styles.statLabel}>Average Temperature</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="water" size={32} color="#6B9B8A" />
            <Text style={styles.statValue}>{currentReport.avgHumidity}%</Text>
            <Text style={styles.statLabel}>Average Humidity</Text>
          </View>
        </View>

        {/* Additional Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Key Insights</Text>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <Ionicons name="information-circle" size={20} color="#66BB6A" />
              <Text style={styles.insightText}>
                Overall environment status: {currentReport.environmentStatus}
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="checkmark-circle" size={20} color="#66BB6A" />
              <Text style={styles.insightText}>
                Predicted quality: {currentReport.predictedQuality} (confidence {currentReport.predictionConfidence}%)
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="alert-circle" size={20} color="#FF6B6B" />
              <Text style={styles.insightText}>
                {currentReport.topRiskPeriods.length} high-risk periods detected — review Top Risk Periods
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownloadPDF}
            activeOpacity={0.85}
          >
            <Ionicons name="download-outline" size={20} color="#FFFFFF" />
            <Text style={styles.downloadButtonText}>Download PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailReport}
            activeOpacity={0.85}
          >
            <Ionicons name="mail-outline" size={20} color="#6B9B8A" />
            <Text style={styles.emailButtonText}>Email Report</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  periodButtonActive: {
    backgroundColor: "#6B9B8A",
  },
  periodText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B9B8A",
  },
  periodTextActive: {
    color: "#FFFFFF",
  },
  dateFilterContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dateFilter: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  dateFilterLabel: {
    fontSize: 12,
    color: "#7A8A80",
    marginBottom: 6,
  },
  dateFilterValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateFilterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C2C2C",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  summaryContent: {
    
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 16,
  },
  summaryDividerHorizontal: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  summaryLabel: {
    fontSize: 13,
    color: "#7A8A80",
    marginBottom: 8,
    textAlign: "center",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6B9B8A",
  },
  summaryValueLarge: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6B9B8A",
    textAlign: "center",
  },
  dateRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  dateRangeText: {
    fontSize: 13,
    color: "#7A8A80",
  },
  summaryIcon: {
    marginRight: 8,
  },
  performersCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  performersTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 16,
  },
  performersList: {
    
  },
  performerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAF5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  performerRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6B9B8A",
    alignItems: "center",
    justifyContent: "center",
  },
  performerRankText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 2,
  },
  performerId: {
    fontSize: 12,
    color: "#7A8A80",
  },
  performerSupply: {
    alignItems: "flex-end",
  },
  performerSupplyValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6B9B8A",
  },
  performerSmall: {
    fontSize: 12,
    color: "#7A8A80",
    marginTop: 4,
    textAlign: "right",
  },
  statsGrid: {
    flexDirection: "row",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7A8A80",
    textAlign: "center",
  },
  insightsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 16,
  },
  insightsList: {
    
  },
  insightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: "#2C2C2C",
    lineHeight: 20,
  },
  actionButtons: {
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: "#6B9B8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#6B9B8A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 4,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  emailButton: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  borderWidth: 2,
  borderColor: "#6B9B8A",
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B9B8A",
  },
});