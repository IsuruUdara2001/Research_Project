// Dashboard.js - Enhanced UI Version
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    Animated,
    TouchableOpacity
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { BarChart, LineChart } from "react-native-chart-kit";
import { PieChart } from "react-native-gifted-charts";
import BottomNav from "../components/BottomNav";

const COLORS = {
    background: "#E8F5E9",
    card: "#FFFFFF",
    primary: "#4A90E2",
    success: "#27AE60",
    warning: "#F39C12",
    danger: "#E74C3C",
    textDark: "#1B5E20",
    textLight: "#558B2F",
    border: "#C8E6C9"
};

export default function Dashboard() {
    const [latest, setLatest] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(30))[0];

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions({ width: window.width, height: window.height });
        });
        return () => subscription?.remove();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const latestSnap = await getDocs(
                query(collection(db, "history"), orderBy("timestamp", "desc"), limit(1))
            );
            setLatest(latestSnap.docs[0]?.data() || null);

            const histSnap = await getDocs(
                query(collection(db, "history"), orderBy("timestamp", "desc"), limit(10))
            );
            setHistory(histSnap.docs.map(doc => doc.data()).reverse());
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true
                }),
            ]).start();
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading dashboard...</Text>
            </View>
        );
    }

    // Responsive calculations
    const isDesktop = dimensions.width > 768;
    const isTablet = dimensions.width > 600 && dimensions.width <= 768;
    const screenWidth = dimensions.width;
    const padding = isDesktop ? 32 : 16;

    // Data processing
    const labels = history.map((_, i) => `${i + 1}`);
    const tempData = history.map(h => Number(h.temp) || 0);
    const vibrationData = history.map(h => Number(h.vibration) || 0);
    const rpmData = history.map(h => Number(h.rpm) || 0);

    const pieData = [
        {
            value: history.filter(h => h.overall_status === "NORMAL").length,
            color: COLORS.success,
            text: "Normal",
            label: "Normal"
        },
        {
            value: history.filter(h => h.overall_status === "WARNING").length,
            color: COLORS.warning,
            text: "Warning",
            label: "Warning"
        },
        {
            value: history.filter(h => h.overall_status === "CRITICAL").length,
            color: COLORS.danger,
            text: "Critical",
            label: "Critical"
        },
    ].filter(item => item.value > 0);

    const getStatusColor = (status) =>
        status === "NORMAL" ? COLORS.success :
            status === "WARNING" ? COLORS.warning :
                COLORS.danger;

    const getStatusIcon = (status) =>
        status === "NORMAL" ? "checkmark-circle" :
            status === "WARNING" ? "warning" :
                "alert-circle";

    const renderMetricCard = (icon, label, value, unit, color = COLORS.primary) => (
        <View style={[styles.metricCard, isDesktop && styles.metricCardDesktop]}>
            <View style={[styles.metricIconContainer, { backgroundColor: color + '15' }]}>
                <Ionicons name={icon} size={isDesktop ? 32 : 28} color={color} />
            </View>
            <View style={styles.metricContent}>
                <Text style={styles.metricLabel}>{label}</Text>
                <Text style={[styles.metricValue, { color }]}>
                    {value || "-"}
                    <Text style={styles.metricUnit}>{unit}</Text>
                </Text>
            </View>
        </View>
    );

    const chartWidth = screenWidth - (padding * 2) - 20;
    const chartHeight = isDesktop ? 240 : 200;

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, { paddingHorizontal: padding }]}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerTitle}>Belt Monitor</Text>
                            <Text style={styles.headerSubtitle}>Real-time system status</Text>
                        </View>
                        <TouchableOpacity
                            onPress={fetchData}
                            style={styles.refreshButton}
                        >
                            <Ionicons name="refresh" size={22} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Status Banner */}
                    <View style={[styles.statusBanner, {
                        backgroundColor: getStatusColor(latest?.overall_status)
                    }]}>
                        <Ionicons
                            name={getStatusIcon(latest?.overall_status)}
                            size={28}
                            color="white"
                        />
                        <View style={styles.statusContent}>
                            <Text style={styles.statusLabel}>System Status</Text>
                            <Text style={styles.statusValue}>
                                {latest?.overall_status || "UNKNOWN"}
                            </Text>
                        </View>
                    </View>

                    {/* Metrics Grid */}
                    <View style={styles.metricsGrid}>
                        {renderMetricCard(
                            "thermometer-outline",
                            "Temperature",
                            latest?.temp,
                            "°C",
                            "#E74C3C"
                        )}
                        {renderMetricCard(
                            "pulse-outline",
                            "Vibration",
                            latest?.vibration,
                            "g",
                            "#9B59B6"
                        )}
                        {renderMetricCard(
                            "speedometer-outline",
                            "RPM",
                            latest?.rpm,
                            "",
                            "#3498DB"
                        )}
                    </View>

                    {/* Status Distribution - First */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Status Distribution</Text>
                            <Text style={styles.sectionSubtitle}>Overall system health</Text>
                        </View>
                        <View style={styles.pieCard}>
                            {pieData.length > 0 ? (
                                <>
                                    <PieChart
                                        data={pieData}
                                        donut
                                        radius={isDesktop ? 90 : 75}
                                        innerRadius={isDesktop ? 50 : 40}
                                        innerCircleColor={COLORS.card}
                                        centerLabelComponent={() => (
                                            <View style={styles.pieCenter}>
                                                <Text style={styles.pieCenterValue}>
                                                    {history.length}
                                                </Text>
                                                <Text style={styles.pieCenterLabel}>Total</Text>
                                            </View>
                                        )}
                                    />
                                    <View style={styles.legendContainer}>
                                        {pieData.map((item, index) => (
                                            <View key={index} style={styles.legendItem}>
                                                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                                                <Text style={styles.legendText}>
                                                    {item.label}: {item.value}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : (
                                <Text style={styles.noDataText}>No data available</Text>
                            )}
                        </View>
                    </View>

                    {/* Temperature Trends - Second */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Temperature Trends</Text>
                            <Text style={styles.sectionSubtitle}>Last 10 readings</Text>
                        </View>
                        <View style={styles.chartCard}>
                            <LineChart
                                data={{
                                    labels: labels.length > 6 ?
                                        labels.filter((_, i) => i % 2 === 0) :
                                        labels,
                                    datasets: [{
                                        data: tempData.length > 0 ? tempData : [0],
                                        color: () => COLORS.danger,
                                        strokeWidth: 3
                                    }]
                                }}
                                width={chartWidth}
                                height={chartHeight}
                                yAxisSuffix="°"
                                fromZero
                                chartConfig={{
                                    backgroundColor: "#fff",
                                    backgroundGradientFrom: "#fff",
                                    backgroundGradientTo: "#fff",
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
                                    labelColor: () => COLORS.textLight,
                                    propsForDots: {
                                        r: "4",
                                        strokeWidth: "2",
                                        stroke: COLORS.danger
                                    },
                                    propsForLabels: {
                                        fontSize: 11
                                    }
                                }}
                                bezier
                                style={styles.chart}
                            />
                        </View>
                    </View>

                    {/* Vibration Trends - Third */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Vibration Trends</Text>
                            <Text style={styles.sectionSubtitle}>Performance monitoring</Text>
                        </View>
                        <View style={styles.chartCard}>
                            <LineChart
                                data={{
                                    labels: labels.length > 6 ?
                                        labels.filter((_, i) => i % 2 === 0) :
                                        labels,
                                    datasets: [{
                                        data: vibrationData.length > 0 ? vibrationData : [0],
                                        color: () => '#9B59B6',
                                        strokeWidth: 3
                                    }]
                                }}
                                width={chartWidth}
                                height={chartHeight}
                                yAxisSuffix="g"
                                fromZero
                                chartConfig={{
                                    backgroundColor: "#fff",
                                    backgroundGradientFrom: "#fff",
                                    backgroundGradientTo: "#fff",
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => `rgba(155, 89, 182, ${opacity})`,
                                    labelColor: () => COLORS.textLight,
                                    propsForDots: {
                                        r: "4",
                                        strokeWidth: "2",
                                        stroke: '#9B59B6'
                                    },
                                    propsForLabels: {
                                        fontSize: 11
                                    }
                                }}
                                bezier
                                style={styles.chart}
                            />
                        </View>
                    </View>

                    {/* RPM Trends - Fourth */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>RPM Trends</Text>
                            <Text style={styles.sectionSubtitle}>Speed monitoring</Text>
                        </View>
                        <View style={styles.chartCard}>
                            <LineChart
                                data={{
                                    labels: labels.length > 6 ?
                                        labels.filter((_, i) => i % 2 === 0) :
                                        labels,
                                    datasets: [{
                                        data: rpmData.length > 0 ? rpmData : [0],
                                        color: () => COLORS.primary,
                                        strokeWidth: 3
                                    }]
                                }}
                                width={chartWidth}
                                height={chartHeight}
                                yAxisSuffix=""
                                fromZero
                                chartConfig={{
                                    backgroundColor: "#fff",
                                    backgroundGradientFrom: "#fff",
                                    backgroundGradientTo: "#fff",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
                                    labelColor: () => COLORS.textLight,
                                    propsForDots: {
                                        r: "4",
                                        strokeWidth: "2",
                                        stroke: COLORS.primary
                                    },
                                    propsForLabels: {
                                        fontSize: 11
                                    }
                                }}
                                bezier
                                style={styles.chart}
                            />
                        </View>
                    </View>

                    <View style={{ height: 20 }} />
                </Animated.View>
            </ScrollView>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    scrollContent: {
        paddingTop: 20,
        paddingBottom: 100
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: COLORS.textDark,
        fontWeight: "500",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.textDark,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 4,
    },
    refreshButton: {
        width: 44,
        height: 44,
        backgroundColor: COLORS.card,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    statusContent: {
        marginLeft: 16,
        flex: 1,
    },
    statusLabel: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: "500",
    },
    statusValue: {
        fontSize: 22,
        fontWeight: "bold",
        color: 'white',
        marginTop: 2,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
        marginBottom: 24,
    },
    metricCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        margin: 6,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        minWidth: '45%',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    metricCardDesktop: {
        minWidth: '30%',
    },
    metricIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    metricContent: {
        flex: 1,
    },
    metricLabel: {
        fontSize: 13,
        color: COLORS.textLight,
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 24,
        fontWeight: "bold",
    },
    metricUnit: {
        fontSize: 16,
        fontWeight: "normal",
        color: COLORS.textLight,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textDark,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: COLORS.textLight,
        marginTop: 2,
    },
    chartCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    chart: {
        borderRadius: 8,
    },
    pieCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 24,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    pieCenter: {
        alignItems: 'center',
    },
    pieCenterValue: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.textDark,
    },
    pieCenterLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 2,
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
        marginVertical: 4,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    legendText: {
        fontSize: 14,
        color: COLORS.textDark,
    },
    noDataText: {
        fontSize: 14,
        color: COLORS.textLight,
        fontStyle: "italic",
    }
});