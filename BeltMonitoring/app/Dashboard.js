// Dashboard.js - Enhanced Visual Version
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
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
    background: "#F0F4F8",
    card: "#FFFFFF",
    primary: "#4A90E2",
    primaryLight: "#6BA3E8",
    success: "#27AE60",
    successLight: "#52C97C",
    warning: "#F39C12",
    warningLight: "#F5B041",
    danger: "#E74C3C",
    dangerLight: "#EC7063",
    textDark: "#2C3E50",
    textMedium: "#5D6D7E",
    textLight: "#95A5A6",
    border: "#E8EEF2",
    shadow: "#34495E"
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
                <View style={styles.loaderCard}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Loading dashboard...</Text>
                    <View style={styles.loadingBar}>
                        <View style={styles.loadingBarFill} />
                    </View>
                </View>
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
            label: "Normal",
            gradientCenterColor: COLORS.successLight
        },
        {
            value: history.filter(h => h.overall_status === "WARNING").length,
            color: COLORS.warning,
            text: "Warning",
            label: "Warning",
            gradientCenterColor: COLORS.warningLight
        },
        {
            value: history.filter(h => h.overall_status === "CRITICAL").length,
            color: COLORS.danger,
            text: "Critical",
            label: "Critical",
            gradientCenterColor: COLORS.dangerLight
        },
    ].filter(item => item.value > 0);

    const getStatusColor = (status) =>
        status === "NORMAL" ? COLORS.success :
            status === "WARNING" ? COLORS.warning :
                COLORS.danger;

    const getStatusGradient = (status) =>
        status === "NORMAL" ? [COLORS.success, COLORS.successLight] :
            status === "WARNING" ? [COLORS.warning, COLORS.warningLight] :
                [COLORS.danger, COLORS.dangerLight];

    const getStatusIcon = (status) =>
        status === "NORMAL" ? "checkmark-circle" :
            status === "WARNING" ? "warning" :
                "alert-circle";

    const renderMetricCard = (icon, label, value, unit, color = COLORS.primary, colorLight = COLORS.primaryLight) => (
        <View style={[styles.metricCard, isDesktop && styles.metricCardDesktop]}>
            <View style={styles.metricGlow}>
                <View style={[styles.metricIconContainer, {
                    backgroundColor: color + '08',
                    borderColor: color + '20',
                }]}>
                    <View style={[styles.iconGlow, { backgroundColor: color + '15' }]} />
                    <Ionicons name={icon} size={isDesktop ? 32 : 28} color={color} />
                </View>
            </View>
            <View style={styles.metricContent}>
                <Text style={styles.metricLabel}>{label}</Text>
                <View style={styles.metricValueContainer}>
                    <Text style={[styles.metricValue, { color }]}>
                        {value || "-"}
                    </Text>
                    <Text style={[styles.metricUnit, { color: colorLight }]}>{unit}</Text>
                </View>
                <View style={[styles.metricIndicator, { backgroundColor: color + '20' }]}>
                    <View style={[styles.metricIndicatorFill, { backgroundColor: color }]} />
                </View>
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
                            <View style={styles.headerSubtitleContainer}>
                                <View style={styles.liveDot} />
                                <Text style={styles.headerSubtitle}>Real-time system status</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={fetchData}
                            style={styles.refreshButton}
                        >
                            <View style={styles.refreshButtonGlow} />
                            <Ionicons name="refresh" size={22} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Status Banner with Gradient */}
                    <View style={styles.statusBannerContainer}>
                        <LinearGradient
                            colors={getStatusGradient(latest?.overall_status)}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.statusBanner}
                        >
                            <View style={styles.statusIconContainer}>
                                <Ionicons
                                    name={getStatusIcon(latest?.overall_status)}
                                    size={32}
                                    color="white"
                                />
                                <View style={styles.statusPulse} />
                            </View>
                            <View style={styles.statusContent}>
                                <Text style={styles.statusLabel}>System Status</Text>
                                <Text style={styles.statusValue}>
                                    {latest?.overall_status || "UNKNOWN"}
                                </Text>
                            </View>
                            <View style={styles.statusDecoration}>
                                <View style={styles.statusCircle1} />
                                <View style={styles.statusCircle2} />
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Metrics Grid */}
                    <View style={styles.metricsGrid}>
                        {renderMetricCard(
                            "thermometer-outline",
                            "Temperature",
                            latest?.temp,
                            "°C",
                            "#E74C3C",
                            "#EC7063"
                        )}
                        {renderMetricCard(
                            "pulse-outline",
                            "Vibration",
                            latest?.vibration,
                            "g",
                            "#9B59B6",
                            "#BB8FCE"
                        )}
                        {renderMetricCard(
                            "speedometer-outline",
                            "RPM",
                            latest?.rpm,
                            "",
                            "#3498DB",
                            "#5DADE2"
                        )}
                    </View>

                    {/* Status Distribution */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View>
                                <Text style={styles.sectionTitle}>Status Distribution</Text>
                                <Text style={styles.sectionSubtitle}>Overall system health</Text>
                            </View>
                            <View style={styles.sectionBadge}>
                                <Ionicons name="pie-chart-outline" size={16} color={COLORS.primary} />
                            </View>
                        </View>
                        <View style={styles.pieCard}>
                            {pieData.length > 0 ? (
                                <>
                                    <View style={styles.pieContainer}>
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
                                    </View>
                                    <View style={styles.legendContainer}>
                                        {pieData.map((item, index) => (
                                            <View key={index} style={styles.legendItem}>
                                                <View style={styles.legendDotContainer}>
                                                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                                                    <View style={[styles.legendDotGlow, { backgroundColor: item.color + '30' }]} />
                                                </View>
                                                <Text style={styles.legendText}>
                                                    {item.label}
                                                </Text>
                                                <View style={styles.legendBadge}>
                                                    <Text style={styles.legendBadgeText}>{item.value}</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : (
                                <Text style={styles.noDataText}>No data available</Text>
                            )}
                        </View>
                    </View>

                    {/* Temperature Trends */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View>
                                <Text style={styles.sectionTitle}>Temperature Trends</Text>
                                <Text style={styles.sectionSubtitle}>Last 10 readings</Text>
                            </View>
                            <View style={[styles.sectionBadge, { backgroundColor: COLORS.danger + '15' }]}>
                                <Ionicons name="trending-up-outline" size={16} color={COLORS.danger} />
                            </View>
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
                                    labelColor: () => COLORS.textMedium,
                                    propsForDots: {
                                        r: "5",
                                        strokeWidth: "2",
                                        stroke: COLORS.danger,
                                        fill: "#fff"
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

                    {/* Vibration Trends */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View>
                                <Text style={styles.sectionTitle}>Vibration Trends</Text>
                                <Text style={styles.sectionSubtitle}>Performance monitoring</Text>
                            </View>
                            <View style={[styles.sectionBadge, { backgroundColor: '#9B59B6' + '15' }]}>
                                <Ionicons name="analytics-outline" size={16} color="#9B59B6" />
                            </View>
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
                                    labelColor: () => COLORS.textMedium,
                                    propsForDots: {
                                        r: "5",
                                        strokeWidth: "2",
                                        stroke: '#9B59B6',
                                        fill: "#fff"
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

                    {/* RPM Trends */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View>
                                <Text style={styles.sectionTitle}>RPM Trends</Text>
                                <Text style={styles.sectionSubtitle}>Speed monitoring</Text>
                            </View>
                            <View style={[styles.sectionBadge, { backgroundColor: COLORS.primary + '15' }]}>
                                <Ionicons name="speedometer-outline" size={16} color={COLORS.primary} />
                            </View>
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
                                    labelColor: () => COLORS.textMedium,
                                    propsForDots: {
                                        r: "5",
                                        strokeWidth: "2",
                                        stroke: COLORS.primary,
                                        fill: "#fff"
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
    loaderCard: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        elevation: 8,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: COLORS.textDark,
        fontWeight: "600",
    },
    loadingBar: {
        width: 200,
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: 2,
        marginTop: 16,
        overflow: 'hidden',
    },
    loadingBarFill: {
        width: '60%',
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: "800",
        color: COLORS.textDark,
        letterSpacing: -0.5,
    },
    headerSubtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.success,
        marginRight: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    refreshButton: {
        width: 48,
        height: 48,
        backgroundColor: COLORS.card,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    refreshButtonGlow: {
        position: 'absolute',
        width: 48,
        height: 48,
        backgroundColor: COLORS.primary + '10',
        borderRadius: 24,
    },
    statusBannerContainer: {
        marginBottom: 24,
        borderRadius: 20,
        elevation: 6,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    statusIconContainer: {
        position: 'relative',
        width: 56,
        height: 56,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusPulse: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    statusContent: {
        marginLeft: 16,
        flex: 1,
    },
    statusLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.95)',
        fontWeight: "600",
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statusValue: {
        fontSize: 26,
        fontWeight: "800",
        color: 'white',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    statusDecoration: {
        position: 'absolute',
        right: -20,
        top: -20,
    },
    statusCircle1: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    statusCircle2: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        top: 20,
        left: 20,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
        marginBottom: 24,
    },
    metricCard: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 18,
        margin: 6,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        minWidth: '45%',
        elevation: 3,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    metricCardDesktop: {
        minWidth: '30%',
    },
    metricGlow: {
        position: 'relative',
    },
    metricIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        borderWidth: 2,
        position: 'relative',
        overflow: 'hidden',
    },
    iconGlow: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    metricContent: {
        flex: 1,
    },
    metricLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 6,
        fontWeight: "600",
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    metricValueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    metricValue: {
        fontSize: 28,
        fontWeight: "800",
        letterSpacing: -0.5,
    },
    metricUnit: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 4,
    },
    metricIndicator: {
        height: 4,
        borderRadius: 2,
        marginTop: 8,
        overflow: 'hidden',
    },
    metricIndicatorFill: {
        width: '70%',
        height: '100%',
        borderRadius: 2,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.textDark,
        letterSpacing: -0.3,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: COLORS.textLight,
        marginTop: 4,
    },
    sectionBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartCard: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 16,
        elevation: 3,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    chart: {
        borderRadius: 12,
    },
    pieCard: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 28,
        elevation: 3,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    pieContainer: {
        marginBottom: 8,
    },
    pieCenter: {
        alignItems: 'center',
    },
    pieCenterValue: {
        fontSize: 32,
        fontWeight: "800",
        color: COLORS.textDark,
        letterSpacing: -0.5,
    },
    pieCenterLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 4,
        fontWeight: "600",
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    legendContainer: {
        width: '100%',
        marginTop: 24,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: COLORS.background,
        borderRadius: 12,
        marginBottom: 8,
    },
    legendDotContainer: {
        position: 'relative',
        marginRight: 12,
    },
    legendDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 3,
        borderColor: COLORS.card,
    },
    legendDotGlow: {
        position: 'absolute',
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    legendText: {
        fontSize: 15,
        color: COLORS.textDark,
        fontWeight: "600",
        flex: 1,
    },
    legendBadge: {
        backgroundColor: COLORS.textDark,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    legendBadgeText: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.card,
    },
    noDataText: {
        fontSize: 14,
        color: COLORS.textLight,
        fontStyle: "italic",
    }
});