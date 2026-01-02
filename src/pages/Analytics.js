import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Analytics({ navigation }) {
  const [selectedTrend, setSelectedTrend] = useState("Day");
  const [selectedUnit, setSelectedUnit] = useState("Celsius");

  const humidityData = {
    Day: [65, 78, 72, 68, 85, 75, 82, 70, 68, 90, 78, 85],
    Week: [70, 75, 72, 78, 82, 80, 76],
    Month: [72, 76, 74, 78],
  };

  const timeLabels = {
    Day: ["12 AM", "6 AM", "12 PM", "6 PM", "Now"],
    Week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    Month: ["Week 1", "Week 2", "Week 3", "Week 4"],
  };

  const renderChart = () => {
    const data = humidityData[selectedTrend];
    const maxValue = Math.max(...data);
    const labels = timeLabels[selectedTrend];

    return (
      <View style={styles.chartArea}>
        {/* Chart bars */}
        <View style={styles.barsContainer}>
          {data.map((value, index) => {
            const height = (value / maxValue) * 150;
            return (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    { height: height, backgroundColor: "#6B9B8A" },
                  ]}
                />
              </View>
            );
          })}
        </View>

        {/* Labels */}
        <View style={styles.labelsContainer}>
          {labels.map((label, index) => (
            <Text key={index} style={styles.labelText}>
              {label}
            </Text>
          ))}
        </View>
      </View>
    );
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
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Temperature Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="thermometer-outline" size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Temperature</Text>
          </View>
          <Text style={styles.mainValue}>24°</Text>
          <Text style={styles.subValue}>Feels like 22°</Text>
        </View>

        {/* Humidity Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="water-outline" size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Humidity</Text>
          </View>
          <Text style={styles.mainValue}>65%</Text>
          <Text style={styles.subValue}>Comfortable</Text>
        </View>

        {/* Unit Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedUnit === "Celsius" && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedUnit("Celsius")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.toggleText,
                selectedUnit === "Celsius" && styles.toggleTextActive,
              ]}
            >
              Celsius
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedUnit === "Fahrenheit" && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedUnit("Fahrenheit")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.toggleText,
                selectedUnit === "Fahrenheit" && styles.toggleTextActive,
              ]}
            >
              Fahrenheit
            </Text>
          </TouchableOpacity>
        </View>

        {/* 24-Hour Trend */}
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>24-Hour Trend</Text>

          {/* Trend Period Selector */}
          <View style={styles.periodSelector}>
            {["Day", "Week", "Month"].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedTrend === period && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedTrend(period)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedTrend === period && styles.periodTextActive,
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Chart */}
          {renderChart()}

          {/* Refresh Button */}
          <TouchableOpacity style={styles.refreshButton} activeOpacity={0.7}>
            <Ionicons name="refresh-outline" size={24} color="#6B9B8A" />
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
  card: {
    backgroundColor: "#6B9B8A",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  mainValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subValue: {
    fontSize: 16,
    color: "#E8F5E9",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    gap: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#6B9B8A",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B9B8A",
  },
  toggleTextActive: {
    color: "#FFFFFF",
  },
  trendCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    position: "relative",
  },
  trendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FAFAF5",
  },
  periodButtonActive: {
    backgroundColor: "#E8F5E9",
  },
  periodText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7A8A80",
  },
  periodTextActive: {
    color: "#6B9B8A",
    fontWeight: "600",
  },
  chartArea: {
    marginTop: 16,
    marginBottom: 60,
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 150,
    marginBottom: 12,
  },
  barWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    width: "70%",
    borderRadius: 4,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: 11,
    color: "#7A8A80",
    textAlign: "center",
  },
  refreshButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6B9B8A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});