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
import { API_ENDPOINTS } from "../config/apiConfig";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { database } from "../config/firebaseConfig";

export default function LiveHumidity({ navigation }) {
  const [currentHumidity, setCurrentHumidity] = useState(65);
  const [currentTemperature, setCurrentTemperature] = useState(24);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const API_URL = API_ENDPOINTS.PREDICT_WITHERING;

  const fetchLiveData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          elapsed_mins: 0,
          temp: 24.0, 
          humidity: 65.0,
          temp_slope: 0.0,
          rh_slope: 0.0,
        }),
      });

      const result = await response.json();
      
      if (result) {
        // Replace with actual sensor values from your backend logic if available
        // For now, we update the timestamp to show the connection is live
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Live Humidity Sync Error:", error);
    }
  };

  useEffect(() => {
    // Reference to the specific device in weather_data
    const weatherRef = query(
      ref(database, 'weather_data/6C:C8:40:8B:49:DC'),
      limitToLast(1)
    );

    // Set up real-time listener
    const unsubscribe = onValue(weatherRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Since limitToLast(1) returns an object with a random key as the root,
        // we take the first value inside it.
        const latestEntryKey = Object.keys(data)[0];
        const latestData = data[latestEntryKey];
        
        if (latestData.humidity !== undefined) {
          setCurrentHumidity(Math.round(latestData.humidity));
        }
        if (latestData.temperature !== undefined) {
          setCurrentTemperature(latestData.temperature);
        }
        setLastUpdated(new Date());
      } else {
        console.log("No data available");
      }
    }, (error) => {
      console.error("Firebase Realtime Database Error:", error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Since Firebase maintains a persistent connection, this is just for UI feedback
    setTimeout(() => {
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
        <View style={styles.liveIndicator}>
            <View style={[styles.liveDot, { marginRight: 8 }]} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>

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
            <Text style={status.statusText}>{status.text}</Text>
          </View>
        </View>

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
          <Text style={styles.infoValue}>{Number(currentTemperature).toFixed(2)}°C</Text>
        </View>

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