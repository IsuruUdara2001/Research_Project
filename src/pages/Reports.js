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
      totalFarmers: 45,
      totalSupply: 1250,
      avgSupply: 27.8,
      date: "23/12/2024",
      topFarmers: [
        { id: "F001", name: "John Silva", supply: 85 },
        { id: "F002", name: "Kumara Perera", supply: 78 },
        { id: "F003", name: "Nimal Fernando", supply: 65 },
      ],
    },
    Weekly: {
      totalFarmers: 52,
      totalSupply: 8750,
      avgSupply: 168.3,
      dateRange: "17/12/2024 - 23/12/2024",
      topFarmers: [
        { id: "F001", name: "John Silva", supply: 595 },
        { id: "F002", name: "Kumara Perera", supply: 546 },
        { id: "F003", name: "Nimal Fernando", supply: 455 },
      ],
    },
    Monthly: {
      totalFarmers: 58,
      totalSupply: 35200,
      avgSupply: 607.0,
      dateRange: "01/12/2024 - 31/12/2024",
      topFarmers: [
        { id: "F001", name: "John Silva", supply: 2380 },
        { id: "F002", name: "Kumara Perera", supply: 2184 },
        { id: "F003", name: "Nimal Fernando", supply: 1820 },
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
            <Ionicons name="document-text" size={24} color="#6B9B8A" />
            <Text style={styles.summaryTitle}>{selectedPeriod} Summary</Text>
          </View>

          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Farmers</Text>
                <Text style={styles.summaryValue}>
                  {currentReport.totalFarmers}
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Supply</Text>
                <Text style={styles.summaryValue}>
                  {currentReport.totalSupply} kg
                </Text>
              </View>
            </View>

            <View style={styles.summaryDividerHorizontal} />

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Average Supply per Farmer</Text>
              <Text style={styles.summaryValueLarge}>
                {currentReport.avgSupply} kg
              </Text>
            </View>

            <View style={styles.dateRangeContainer}>
              <Ionicons name="calendar-outline" size={16} color="#7A8A80" />
              <Text style={styles.dateRangeText}>
                {currentReport.date || currentReport.dateRange}
              </Text>
            </View>
          </View>
        </View>

        {/* Top Performers */}
        <View style={styles.performersCard}>
          <Text style={styles.performersTitle}>Top Performers</Text>
          <View style={styles.performersList}>
            {currentReport.topFarmers.map((farmer, index) => (
              <View key={farmer.id} style={styles.performerItem}>
                <View style={styles.performerRank}>
                  <Text style={styles.performerRankText}>{index + 1}</Text>
                </View>
                <View style={styles.performerInfo}>
                  <Text style={styles.performerName}>{farmer.name}</Text>
                  <Text style={styles.performerId}>ID: {farmer.id}</Text>
                </View>
                <View style={styles.performerSupply}>
                  <Text style={styles.performerSupplyValue}>
                    {farmer.supply} kg
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={32} color="#66BB6A" />
            <Text style={styles.statValue}>+12%</Text>
            <Text style={styles.statLabel}>Growth Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people" size={32} color="#6B9B8A" />
            <Text style={styles.statValue}>95%</Text>
            <Text style={styles.statLabel}>Active Farmers</Text>
          </View>
        </View>

        {/* Additional Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Key Insights</Text>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <Ionicons name="checkmark-circle" size={20} color="#66BB6A" />
              <Text style={styles.insightText}>
                Supply increased by 12% compared to last{" "}
                {selectedPeriod.toLowerCase()} period
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="checkmark-circle" size={20} color="#66BB6A" />
              <Text style={styles.insightText}>
                {currentReport.topFarmers.length} farmers contributed 45% of
                total supply
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="information-circle" size={20} color="#6B9B8A" />
              <Text style={styles.insightText}>
                Average quality rating: 4.5/5.0
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
    gap: 4,
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
    gap: 12,
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
    gap: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  summaryContent: {
    gap: 16,
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
    gap: 6,
    marginTop: 4,
  },
  dateRangeText: {
    fontSize: 13,
    color: "#7A8A80",
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
    gap: 12,
  },
  performerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAF5",
    borderRadius: 12,
    padding: 12,
    gap: 12,
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
  statsGrid: {
    flexDirection: "row",
    gap: 12,
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
    gap: 12,
  },
  insightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: "#2C2C2C",
    lineHeight: 20,
  },
  actionButtons: {
    gap: 12,
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
    gap: 8,
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
    gap: 8,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B9B8A",
  },
});