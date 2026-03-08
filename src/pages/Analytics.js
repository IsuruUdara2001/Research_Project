import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_ENDPOINTS } from "../config/apiConfig";

export default function Analytics({ navigation }) {
  const [selectedTrend, setSelectedTrend] = useState("Day");

  
  const [liveTemp, setLiveTemp] = useState(24.5); // Start with realistic tea factory temp
  const [liveHum, setLiveHum] = useState(65.0);   // Start with realistic humidity
  const [qualityData, setQualityData] = useState({
    grade: "Loading...",
    recommendation: "Fetching analysis from server...",
    percent: 0,
    error: null
  });

  const [humidityData, setHumidityData] = useState({
    Day: [],
    Week: [],
    Month: [],
  });

  const [manualTemp, setManualTemp] = useState("");
  const [manualHum, setManualHum] = useState("");
  const [isAnalysing, setIsAnalysing] = useState(false);

  const API_URL = API_ENDPOINTS.PREDICT_QUALITY;

  const fetchQuality = async (temp, hum, isManual = false) => {
    try {
      if (isManual) setIsAnalysing(true);
      
      console.log(`Fetching quality prediction: Temp=${temp}°C, Humidity=${hum}%`);
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          temp: parseFloat(temp) || 24.5, 
          humidity: parseFloat(hum) || 65.0
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log("Quality Prediction Success:", result);
        if (!isManual) {
          setQualityData({
            grade: result.predicted_grade || "Unknown",
            recommendation: result.recommendation || "No recommendation available",
            percent: result.confidence_score || 75,
            error: null
          });
          setLiveTemp(parseFloat(temp) || 24.5);
          setLiveHum(parseFloat(hum) || 65.0);
        } else {
          navigation.navigate("AnalyticsResult", { 
            result: result 
          });
          setManualTemp("");
          setManualHum("");
        }
      } else {
        console.error("API Error:", result);
        setQualityData(prev => ({
          ...prev,
          error: result.detail || "Failed to get prediction"
        }));
      }
    } catch (error) {
      console.error("Quality Prediction Error:", error);
      setQualityData(prev => ({
        ...prev,
        error: `Connection Error: ${error.message}`
      }));
    } finally {
      setIsAnalysing(false);
    }
  };

  useEffect(() => {
    // Fetch with initial realistic values
    fetchQuality(liveTemp, liveHum);
    const interval = setInterval(() => {
      fetchQuality(liveTemp, liveHum);
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getQualityColor = (grade) => {
    if (grade === "Premium") return "#4CAF50";
    if (grade === "Standard") return "#FFB300";
    return "#E57373";
  };


  const timeLabels = {
    Day: ["12 AM", "6 AM", "12 PM", "6 PM", "Now"],
    Week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    Month: ["W1", "W2", "W3", "W4"],
  };

  const renderChart = () => {
    const data = humidityData[selectedTrend];
    const labels = timeLabels[selectedTrend];
    

    if (!data || data.length === 0) {
      return (
        <View style={[styles.chartArea, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#7A8A80' }}>No trend data available yet.</Text>
        </View>
      );
    }

    const maxValue = Math.max(...data, 100);

    return (
      <View style={styles.chartArea}>
        <View style={styles.barsContainer}>
          {data.map((value, index) => {
            const height = (value / maxValue) * 150;
            return (
              <View key={index} style={styles.barWrapper}>
                <View style={[styles.bar, { height: height, backgroundColor: "#6B9B8A" }]} />
              </View>
            );
          })}
        </View>
        <View style={styles.labelsContainer}>
          {labels.map((label, index) => (
            <Text key={index} style={styles.labelText}>{label}</Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="thermometer-outline" size={24} color="#FFFFFF" style={styles.cardHeaderIcon} />
            <Text style={styles.cardTitle}>Live Temperature</Text>
          </View>
          <Text style={styles.mainValue}>{liveTemp.toFixed(1)}°C</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="water-outline" size={24} color="#FFFFFF" style={styles.cardHeaderIcon} />
            <Text style={styles.cardTitle}>Live Humidity</Text>
          </View>
          <Text style={styles.mainValue}>{liveHum.toFixed(1)}%</Text>
        </View>

        <View style={styles.qualityCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="leaf-outline" size={24} color="#6B9B8A" style={styles.cardHeaderIcon} />
            <Text style={[styles.cardTitle, {color: '#2C2C2C'}]}>Live Quality Prediction</Text>
          </View>
          
          {qualityData.error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={32} color="#FF6B6B" />
              <Text style={styles.errorText}>{qualityData.error}</Text>
              <Text style={styles.errorSubtext}>Temp: {liveTemp.toFixed(1)}°C | Humidity: {liveHum.toFixed(1)}%</Text>
            </View>
          ) : (
            <>
              <View style={styles.qualityRow}>
                <Text style={styles.qualityPercent}>{qualityData.percent}%</Text>
                <View style={[styles.qualityBadge, { backgroundColor: getQualityColor(qualityData.grade) }]}>
                  <Text style={styles.qualityBadgeText}>{qualityData.grade}</Text>
                </View>
              </View>

              <Text style={styles.recommendationText}>{qualityData.recommendation}</Text>
            </>
          )}
        </View>

        <View style={styles.qualityCard}>
          <Text style={styles.cardTitleBlack}>Check Custom Conditions</Text>
          <View style={styles.formRow}>
            <View style={styles.formCol}>
              <Text style={styles.label}>Temp (°C)</Text>
              <TextInput 
                style={styles.input} 
                value={manualTemp} 
                placeholder="00"
                onChangeText={setManualTemp} 
                keyboardType="numeric" 
              />
            </View>
            <View style={styles.formCol}>
              <Text style={styles.label}>Hum (%)</Text>
              <TextInput 
                style={styles.input} 
                value={manualHum} 
                placeholder="00"
                onChangeText={setManualHum} 
                keyboardType="numeric" 
              />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.analyseButton} 
            onPress={() => fetchQuality(manualTemp, manualHum, true)}
          >
            {isAnalysing ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Analyse Now</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>Humidity Trends</Text>
          <View style={styles.periodSelector}>
            {["Day", "Week", "Month"].map((p) => (
              <TouchableOpacity key={p} onPress={() => setSelectedTrend(p)} style={[styles.periodButton, selectedTrend === p && styles.periodButtonActive]}>
                <Text style={[styles.periodText, selectedTrend === p && styles.periodTextActive]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderChart()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF5" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 40, paddingBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#2C2C2C" },
  backButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  placeholder: { width: 40 },
  scrollContent: { padding: 24 },
  card: { backgroundColor: "#6B9B8A", borderRadius: 20, padding: 20, marginBottom: 12 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  cardHeaderIcon: { marginRight: 8 },
  cardTitle: { fontSize: 16, fontWeight: "500", color: "#FFFFFF" },
  cardTitleBlack: { fontSize: 16, fontWeight: "bold", color: "#2C2C2C", marginBottom: 15 },
  mainValue: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF" },
  qualityCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#E5E5E5" },
  qualityRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  qualityPercent: { fontSize: 32, fontWeight: "bold", color: "#2C2C2C" },
  qualityBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  qualityBadgeText: { color: "#FFFFFF", fontWeight: "bold" },
  recommendationText: { fontSize: 14, color: "#7A8A80", marginTop: 10 },
  formRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  formCol: { width: "48%" },
  label: { fontSize: 12, color: "#7A8A80", marginBottom: 5 },
  input: { backgroundColor: "#F9F9F9", borderWidth: 1, borderColor: "#E5E5E5", borderRadius: 10, padding: 10 },
  analyseButton: { backgroundColor: "#6B9B8A", padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  trendCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "#E5E5E5" },
  trendTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  periodSelector: { flexDirection: "row", marginBottom: 20 },
  periodButton: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: "#F0F0F0", marginRight: 10 },
  periodButtonActive: { backgroundColor: "#6B9B8A" },
  periodText: { fontSize: 12, color: "#7A8A80" },
  periodTextActive: { color: "#FFF", fontWeight: "bold" },
  chartArea: { height: 200 },
  barsContainer: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-around", height: 150 },
  barWrapper: { flex: 1, alignItems: "center" },
  bar: { width: 15, borderRadius: 5 },
  labelsContainer: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  labelText: { fontSize: 10, color: "#7A8A80" },
  errorContainer: { alignItems: "center", paddingVertical: 20, backgroundColor: "#FFF3F3", borderRadius: 10, marginVertical: 10 },
  errorText: { color: "#FF6B6B", fontSize: 16, fontWeight: "bold", marginTop: 10, textAlign: "center" },
  errorSubtext: { color: "#7A8A80", fontSize: 12, marginTop: 8 }
});