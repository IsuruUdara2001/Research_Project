import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LiveHumidity({ navigation }) {
  const [currentHumidity, setCurrentHumidity] = useState(65);
  const [currentTemperature, setCurrentTemperature] = useState(24);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newHumidity = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
      const newTemp = Math.floor(Math.random() * (28 - 22 + 1)) + 22;
      setCurrentHumidity(newHumidity);
      setCurrentTemperature(newTemp);
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const newHumidity = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
      const newTemp = Math.floor(Math.random() * (28 - 22 + 1)) + 22;
      setCurrentHumidity(newHumidity);
      setCurrentTemperature(newTemp);
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 1000);
  };

  const getHumidityStatus = (humidity) => {
    if (humidity < 30)
      return { text: "Too Dry", color: "#FF6B6B", icon: "alert-circle" };
    if (humidity >= 30 && humidity < 50)
      return { text: "Dry", color: "#FFA726", icon: "information-circle" };
    if (humidity >= 50 && humidity <= 70)
      return {
        text: "Comfortable",
        color: "#66BB6A",
        icon: "checkmark-circle",
      };
    if (humidity > 70 && humidity <= 80)
      return { text: "Humid", color: "#FFA726", icon: "information-circle" };
    return { text: "Too Humid", color: "#FF6B6B", icon: "alert-circle" };
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const status = getHumidityStatus(currentHumidity);

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
        <Text style={styles.headerTitle}>Live Humidity</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#6B9B8A"]}
          />
        }
      >
        {/* Live Indicator */}
        <View style={styles.liveIndicator}>
            <View style={[styles.liveDot, { marginRight: 8 }]} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>

        {/* Main Humidity Display */}
        <View style={styles.mainCard}>
          <View style={styles.humidityIconContainer}>
            <Ionicons name="water" size={60} color="#6B9B8A" />
          </View>
          <Text style={styles.humidityValue}>{currentHumidity}%</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
            <Ionicons
              name={status.icon}
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.statusText}>{status.text}</Text>
          </View>
        </View>

        {/* Temperature Display */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons
              name="thermometer-outline"
              size={24}
              color="#6B9B8A"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.infoTitle}>Current Temperature</Text>
          </View>
          <Text style={styles.infoValue}>{currentTemperature}°C</Text>
        </View>

        {/* Humidity Range Guide */}
        <View style={styles.guideCard}>
          <Text style={styles.guideTitle}>Humidity Range Guide</Text>
          <View style={styles.guideList}>
            <View style={styles.guideItem}>
              <View
                style={[styles.guideDot, { backgroundColor: "#FF6B6B", marginRight: 12 }]}
              />
              <Text style={styles.guideText}>{"< 30%: Too Dry"}</Text>
            </View>
            <View style={styles.guideItem}>
              <View
                style={[styles.guideDot, { backgroundColor: "#FFA726", marginRight: 12 }]}
              />
              <Text style={styles.guideText}>30-50%: Dry</Text>
            </View>
            <View style={styles.guideItem}>
              <View
                style={[styles.guideDot, { backgroundColor: "#66BB6A", marginRight: 12 }]}
              />
              <Text style={styles.guideText}>50-70%: Comfortable</Text>
            </View>
            <View style={styles.guideItem}>
              <View
                style={[styles.guideDot, { backgroundColor: "#FFA726", marginRight: 12 }]}
              />
              <Text style={styles.guideText}>70-80%: Humid</Text>
            </View>
            <View style={styles.guideItem}>
              <View
                style={[styles.guideDot, { backgroundColor: "#FF6B6B", marginRight: 12 }]}
              />
              <Text style={styles.guideText}>{"> 80%: Too Humid"}</Text>
            </View>
          </View>
        </View>

        {/* Last Updated */}
        <View style={styles.updateInfo}>
          <Ionicons
            name="time-outline"
            size={16}
            color="#7A8A80"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.updateText}>
            Last updated: {formatTime(lastUpdated)}
          </Text>
        </View>

        {/* Refresh Button */}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefresh}
          activeOpacity={0.85}
        >
          <Ionicons
            name="refresh-outline"
            size={20}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.refreshButtonText}>Refresh Data</Text>
        </TouchableOpacity>
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
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  liveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF6B6B",
  },
  liveText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF6B6B",
    letterSpacing: 1,
  },
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  humidityIconContainer: {
    marginBottom: 15,
  },
  humidityValue: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#6B9B8A",
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2C2C2C",
  },
  infoValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#6B9B8A",
  },
  guideCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 16,
  },
  guideList: {
    // spacing provided per-item via marginRight/marginBottom
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  guideDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  guideText: {
    fontSize: 14,
    color: "#2C2C2C",
  },
  updateInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  updateText: {
    fontSize: 13,
    color: "#7A8A80",
  },
  refreshButton: {
    backgroundColor: "#6B9B8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#6B9B8A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
