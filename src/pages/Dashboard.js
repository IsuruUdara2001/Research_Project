import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function Dashboard({ navigation }) {
  const [currentHumidity, setCurrentHumidity] = useState(65);
  const [currentTemperature, setCurrentTemperature] = useState(24);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHumidity = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
      const newTemp = Math.floor(Math.random() * (28 - 22 + 1)) + 22;
      setCurrentHumidity(newHumidity);
      setCurrentTemperature(newTemp);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getHumidityStatus = (humidity) => {
    if (humidity < 30) return { text: "Too Dry", color: "#FF6B6B" };
    if (humidity >= 30 && humidity < 50)
      return { text: "Dry", color: "#FFA726" };
    if (humidity >= 50 && humidity <= 70)
      return { text: "Comfortable", color: "#66BB6A" };
    if (humidity > 70 && humidity <= 80)
      return { text: "Humid", color: "#FFA726" };
    return { text: "Too Humid", color: "#FF6B6B" };
  };

  const quickActions = [
    {
      id: 1,
      title: "View Analytics",
      icon: "analytics",
      color: "#66BB6A",
      route: "Analytics",
    },
    {
      id: 2,
      title: "Live Monitor",
      icon: "water",
      color: "#42A5F5",
      route: "LiveHumidity",
    },
    {
      id: 3,
      title: "Reports",
      icon: "document-text",
      color: "#9C27B0",
      route: "Reports",
    },
  ];

  const todayStats = {
    totalFarmers: 45,
    totalSupply: 1250,
    avgSupply: 27.8,
    activeNow: 38,
  };

  // Recent environmental insights (replaces farmer/weight entries)
  const recentInsights = [
    {
      id: 1,
      title: "Environment Stable",
      temp: 24.0,
      humidity: 65,
      time: "2 mins ago",
      status: "success",
    },
    {
      id: 2,
      title: "High Humidity Warning",
      temp: 28.5,
      humidity: 92,
      time: "15 mins ago",
      status: "warning",
    },
    {
      id: 3,
      title: "Premium Zone Detected",
      temp: 23.5,
      humidity: 66,
      time: "28 mins ago",
      status: "premium",
    },
  ];

  const humidityStatus = getHumidityStatus(currentHumidity);

  /* RecentActivityCard - reusable card for showing environment insights */
  const RecentActivityCard = ({ item }) => {
    const getStatusIcon = (status) => {
      if (status === "success") return "✅";
      if (status === "warning") return "⚠";
      if (status === "premium") return "⭐";
      return "ℹ️";
    };

    const bgColor =
      item.status === "success"
        ? "#E8F5E9"
        : item.status === "warning"
        ? "#FFF3E0"
        : "#E8F5FF";

    return (
      <View style={styles.activityItem}>
        <View style={[styles.activityIconContainer, { backgroundColor: bgColor }]}>
          <Text style={styles.statusEmoji}>{getStatusIcon(item.status)}</Text>
        </View>

        <View style={styles.activityInfo}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activitySubtitle}>{`${item.temp}°C | ${item.humidity}% RH`}</Text>
        </View>

        <View style={styles.activityTimeWrap}>
          <Text style={styles.activityTime}>{item.time}</Text>
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
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.date}>{formatDate(currentTime)}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={24} color="#2C2C2C" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Live Weather Cards */}
        <View style={styles.weatherContainer}>
          <View style={styles.weatherCard}>
            <View style={styles.weatherIconContainer}>
              <Ionicons name="thermometer" size={25} color="#FFFFFF" />
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherLabel}>Temperature</Text>
              <Text style={styles.weatherValue}>{currentTemperature}°C</Text>
            </View>
          </View>

          <View style={styles.weatherCard}>
            <View style={styles.weatherIconContainer}>
              <Ionicons name="water" size={25} color="#FFFFFF" />
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherLabel}>Humidity</Text>
              <Text style={styles.weatherValue}>{currentHumidity}%</Text>
            </View>
          </View>
        </View>

        {/* Humidity Status Alert */}
        <View
          style={[
            styles.statusAlert,
            { backgroundColor: humidityStatus.color + "15" },
          ]}
        >
          <Ionicons
            name="information-circle"
            size={20}
            color={humidityStatus.color}
          />
          <Text
            style={[styles.statusAlertText, { color: humidityStatus.color }]}
          >
            Current humidity level is {humidityStatus.text}
          </Text>
        </View>

        {/* Today's Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <Text style={styles.sectionTime}>{formatTime(currentTime)}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="people" size={24} color="#6B9B8A" />
            </View>
            <Text style={styles.statValue}>{todayStats.totalFarmers}</Text>
            <Text style={styles.statLabel}>Total Farmers</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="leaf" size={24} color="#66BB6A" />
            </View>
            <Text style={styles.statValue}>{todayStats.totalSupply}</Text>
            <Text style={styles.statLabel}>Total Supply (kg)</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="analytics" size={24} color="#42A5F5" />
            </View>
            <Text style={styles.statValue}>{todayStats.avgSupply}</Text>
            <Text style={styles.statLabel}>Avg Supply (kg)</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.statValue}>{todayStats.activeNow}</Text>
            <Text style={styles.statLabel}>Active Today</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionCard}
              onPress={() => navigation.navigate(action.route)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: action.color },
                ]}
              >
                <Ionicons name={action.icon} size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity (Environmental Insights) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Reports")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityCard}>
          {recentInsights.map((insight, index) => (
            <View key={insight.id}>
              <RecentActivityCard item={insight} />
              {index < recentInsights.length - 1 && (
                <View style={styles.activityDivider} />
              )}
            </View>
          ))}
        </View>

        {/* Performance Summary */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>This Week</Text>
        </View>

        <View style={styles.performanceCard}>
          <View style={styles.performanceRow}>
            <View style={styles.performanceItem}>
              <Ionicons name="trending-up" size={32} color="#66BB6A" />
              <Text style={styles.performanceValue}>+12%</Text>
              <Text style={styles.performanceLabel}>Growth</Text>
            </View>
            <View style={styles.performanceDivider} />
            <View style={styles.performanceItem}>
              <Ionicons name="star" size={32} color="#FFA726" />
              <Text style={styles.performanceValue}>4.5/5</Text>
              <Text style={styles.performanceLabel}>Quality</Text>
            </View>
            <View style={styles.performanceDivider} />
            <View style={styles.performanceItem}>
              <Ionicons name="trophy" size={32} color="#9C27B0" />
              <Text style={styles.performanceValue}>8.7K</Text>
              <Text style={styles.performanceLabel}>Weekly Supply</Text>
            </View>
          </View>
        </View>

        {/* Generate Report Button */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => navigation.navigate("Reports")}
          activeOpacity={0.85}
        >
          <Ionicons name="document-text-outline" size={20} color="#FFFFFF" />
          <Text style={styles.reportButtonText}>Generate Report</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
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
    justifyContent: "space-between",
    alignItems: "center",
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
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 4,
    textAlign: "center",
  },
  date: {
    fontSize: 13,
    color: "#7A8A80",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  weatherContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  weatherCard: {
    flex: 1,
    backgroundColor: "#6B9B8A",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  weatherIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherInfo: {
    flex: 1,
  },
  weatherLabel: {
    fontSize: 11,
    color: "#E8F5E9",
    marginBottom: 4,
  },
  weatherValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statusAlert: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusAlertText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  sectionTime: {
    fontSize: 13,
    color: "#7A8A80",
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B9B8A",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    // replaced `gap` with margin on children for React Native compatibility
    marginBottom: 24,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F5F3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7A8A80",
    textAlign: "center",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  quickActionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginRight: 12,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2C2C2C",
    textAlign: "center",
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  activityIconContainer: {
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
    color: "#7A8A80",
  },
  activityTime: {
    fontSize: 12,
    color: "#7A8A80",
  },
  activityTimeWrap: {
    alignItems: "flex-end",
  },
  statusEmoji: {
    fontSize: 26,
  },
  activitySupply: {
    alignItems: "flex-end",
    // replaced `gap` with margins where needed
  },
  activitySupplyValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6B9B8A",
  },
  activityDivider: {
    height: 1,
    backgroundColor: "#F0F5F3",
    marginVertical: 4,
  },
  performanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  performanceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  performanceItem: {
    alignItems: "center",
    flex: 1,
  },
  performanceDivider: {
    width: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 8,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginTop: 8,
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 11,
    color: "#7A8A80",
    textAlign: "center",
  },
  reportButton: {
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
    // spacing between icon/text handled via text margin
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginHorizontal: 8,
    textAlign: "center",
  },
});