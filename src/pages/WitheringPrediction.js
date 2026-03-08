import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_ENDPOINTS } from "../config/apiConfig";

export default function WitheringPrediction({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    temp: 0,
    humidity: 0,
    elapsedMins: 0,
    remainingMins: 0,
    status: "Connecting...",
    recommendation: "Fetching data from sensors...",
    color: "#95A5A6",
  });

  const API_URL = API_ENDPOINTS.PREDICT_WITHERING;

  const fetchPrediction = async () => {
    try {
      // මෙහි අගයන් සැබෑ පද්ධතියේදී ESP32 වෙතින් හෝ Database එකෙන් ලබාගත යුතුය
      // දැනට පරීක්ෂා කිරීම සඳහා sample data යවමු
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          elapsed_mins: 120, 
          temp: 28.5,
          humidity: 75,
          temp_slope: 0.1,
          rh_slope: -0.2
        }),
      });

      const json = await response.json();

      setData({
        temp: 28.5, // සැබෑ sensor අගය මෙතනට දාන්න
        humidity: 75, 
        elapsedMins: 120,
        remainingMins: json.remaining_mins,
        status: json.analysis.status,
        recommendation: json.analysis.recommendation,
        color: json.analysis.color,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchPrediction();

    const interval = setInterval(() => {
      fetchPrediction();
    }, 30000); 

    return () => clearInterval(interval);
  }, []);

  const totalTime = data.elapsedMins + data.remainingMins;
  const progress = totalTime > 0 ? (data.elapsedMins / totalTime) * 100 : 0;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6B9B8A" />
        <Text>Updating Real-time Prediction...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Real-time Analysis</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Prediction Display */}
        <View style={styles.mainCard}>
          <Text style={styles.cardLabel}>Remaining Time</Text>
          <Text style={styles.timerText}>
            {Math.floor(data.remainingMins / 60)}h {Math.round(data.remainingMins % 60)}m
          </Text>
          
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Quality Status Card */}
        <View style={[styles.alertCard, { borderLeftColor: data.color }]}>
          <Text style={[styles.statusTitle, { color: data.color }]}>{data.status}</Text>
          <Text style={styles.recommendationText}>{data.recommendation}</Text>
        </View>

        {/* Manual Refresh */}
        <TouchableOpacity style={styles.refreshButton} onPress={fetchPrediction}>
          <Ionicons name="refresh" size={20} color="#FFF" />
          <Text style={styles.refreshButtonText}>Sync Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "#FFF" },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  scrollContent: { padding: 20 },
  mainCard: { backgroundColor: "#FFF", padding: 30, borderRadius: 20, alignItems: "center", elevation: 4 },
  cardLabel: { color: "#7F8C8D", marginBottom: 10 },
  timerText: { fontSize: 40, fontWeight: "bold", color: "#2C3E50" },
  progressBarBackground: { width: "100%", height: 10, backgroundColor: "#EEE", borderRadius: 5, marginTop: 20 },
  progressBarFill: { height: "100%", backgroundColor: "#6B9B8A", borderRadius: 5 },
  alertCard: { backgroundColor: "#FFF", padding: 20, borderRadius: 15, marginTop: 20, borderLeftWidth: 5 },
  statusTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  recommendationText: { color: "#34495E" },
  refreshButton: { backgroundColor: "#6B9B8A", flexDirection: "row", padding: 15, borderRadius: 10, justifyContent: "center", marginTop: 20 },
  refreshButtonText: { color: "#FFF", marginLeft: 10, fontWeight: "bold" }
});