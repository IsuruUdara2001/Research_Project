import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    Alert as RNAlert,
    Animated,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Card from "../components/Card";
import BottomNav from "../components/BottomNav";

const COLORS = {
    background: "#E8F5E9",
    cardBg: "#FFFFFF",
    textDark: "#1B5E20",
    textMedium: "#2E7D32",
    textLight: "#558B2F",
    NORMAL: "#4CAF50",
    WARNING: "#F59E0B",
    CRITICAL: "#EF4444",
    normalLight: "#E8F5E9",
    warningLight: "#FEF3C7",
    criticalLight: "#FEE2E2",
    accent: "#2E7D32",
    accentLight: "#C8E6C9",
    border: "#A5D6A7",
};

let cachedAlertData = null;

export default function Alert() {
    const [alerts, setAlerts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions(window);
        });
        return () => subscription?.remove();
    }, []);

    const fetchAlerts = async () => {
        if (!alerts) setLoading(true);

        try {
            const response = await fetch("http://192.168.8.158:5000/alerts");
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            setAlerts(data);
            setIsOffline(false);
            cachedAlertData = data;

            if (data.overall_status === "CRITICAL") {
                RNAlert.alert("🚨 CRITICAL", "Immediate attention required!");
            } else if (data.overall_status === "WARNING") {
                RNAlert.alert("⚠️ WARNING", "Please check the system.");
            }
            if (data.future_prediction === "WARNING") {
                RNAlert.alert("Future Warning", data.future_message || "Issue predicted soon");
            }
            if (data.future_prediction === "CRITICAL") {
                RNAlert.alert("Future Critical", data.future_message || "Critical failure predicted");
            }
        } catch (error) {
            console.log("Fetch error:", error);
            if (cachedAlertData) {
                setAlerts(cachedAlertData);
                setIsOffline(true);
            } else {
                setAlerts(null);
                if (!alerts) RNAlert.alert("Error", "Could not fetch alerts");
            }
        } finally {
            setLoading(false);
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
        }
    };

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 5000);
        return () => clearInterval(interval);
    }, []);

    const getColor = (status) => COLORS[status] || COLORS.NORMAL;
    const getStatusIcon = (status) => {
        switch (status) {
            case "CRITICAL": return "alert-circle";
            case "WARNING": return "warning";
            default: return "checkmark-circle";
        }
    };

    const isDesktop = dimensions.width > 768;
    const horizontalPadding = isDesktop ? 40 : 20;

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLORS.accent} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!alerts) {
        return (
            <View style={styles.loader}>
                <Ionicons name="cloud-offline-outline" size={60} color={COLORS.CRITICAL} />
                <Text style={styles.errorTitle}>No Connection</Text>
                <Text style={styles.errorMessage}>Unable to reach server</Text>
                <TouchableOpacity onPress={fetchAlerts} style={styles.retryButton}>
                    <Ionicons name="refresh" size={22} color="#FFF" />
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
                <BottomNav />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Belt Monitor</Text>
                        <Text style={styles.subtitle}>System Status Dashboard</Text>
                    </View>
                    <TouchableOpacity onPress={fetchAlerts} style={styles.refreshButton}>
                        <Ionicons name="refresh" size={24} color={COLORS.accent} />
                    </TouchableOpacity>
                </View>

                {/* Offline Notice */}
                {isOffline && (
                    <Animated.View style={[styles.noticeBox, styles.offlineNotice, { opacity: fadeAnim }]}>
                        <Ionicons name="cloud-offline" size={18} color={COLORS.WARNING} />
                        <Text style={styles.noticeText}>Offline - Last known data</Text>
                    </Animated.View>
                )}

                {/* Main Status Card */}
                {alerts.overall_status && (
                    <Animated.View style={[styles.mainStatusCard, { opacity: fadeAnim }]}>
                        <View style={styles.statusIconWrapper}>
                            <Ionicons
                                name={getStatusIcon(alerts.overall_status)}
                                size={48}
                                color={getColor(alerts.overall_status)}
                            />
                        </View>
                        <Text style={styles.statusLabel}>Current Status</Text>
                        <Text style={[styles.statusValue, { color: getColor(alerts.overall_status) }]}>
                            {alerts.overall_status}
                        </Text>
                        {alerts.overall_status === "CRITICAL" && (
                            <Text style={styles.statusHint}>Immediate attention needed</Text>
                        )}
                        {alerts.overall_status === "WARNING" && (
                            <Text style={styles.statusHint}>Please check system parameters</Text>
                        )}
                        {alerts.overall_status === "NORMAL" && (
                            <Text style={styles.statusHint}>All systems operating normally</Text>
                        )}
                    </Animated.View>
                )}

                {/* Important Messages */}
                {alerts.ml_prediction && alerts.ml_prediction !== alerts.overall_status && (
                    <View style={styles.messageCard}>
                        <View style={styles.messageHeader}>
                            <Ionicons name="information-circle" size={20} color={COLORS.accent} />
                            <Text style={styles.messageTitle}>AI Analysis</Text>
                        </View>
                        <Text style={styles.messageText}>
                            ML prediction shows {alerts.ml_prediction} status
                        </Text>
                    </View>
                )}

                {alerts.future_message && (
                    <View style={[styles.messageCard, {
                        backgroundColor: alerts.future_prediction === "CRITICAL" ? COLORS.criticalLight :
                            alerts.future_prediction === "WARNING" ? COLORS.warningLight :
                                COLORS.normalLight
                    }]}>
                        <View style={styles.messageHeader}>
                            <Ionicons name="time" size={20} color={getColor(alerts.future_prediction)} />
                            <Text style={styles.messageTitle}>Prediction</Text>
                        </View>
                        <Text style={styles.messageText}>{alerts.future_message}</Text>
                    </View>
                )}

                {/* Metrics Section */}
                <Text style={styles.sectionTitle}>System Metrics</Text>

                <Animated.View style={[styles.cardsGrid, { opacity: fadeAnim }]}>
                    <Card
                        title="Temperature"
                        value={`${alerts.temp ?? "-"}°C`}
                        status={alerts.temp_status ?? "NORMAL"}
                        color={getColor(alerts.temp_status)}
                        icon="🌡️"
                    />
                    <Card
                        title="Vibration"
                        value={alerts.vibration ? "Detected" : "Normal"}
                        status={alerts.vibration_status ?? "NORMAL"}
                        color={getColor(alerts.vibration_status)}
                        icon="📳"
                    />
                    <Card
                        title="RPM"
                        value={alerts.rpm ?? "-"}
                        status={alerts.rpm_status ?? "NORMAL"}
                        color={getColor(alerts.rpm_status)}
                        icon="⚙️"
                    />
                    <Card
                        title="ML Prediction"
                        value={alerts.ml_prediction ?? "NORMAL"}
                        status={alerts.ml_prediction ?? "NORMAL"}
                        color={getColor(alerts.ml_prediction)}
                        icon="🤖"
                    />
                    <Card
                        title="Future Status"
                        value={alerts.future_prediction ?? "NORMAL"}
                        status={alerts.future_prediction ?? "NORMAL"}
                        color={getColor(alerts.future_prediction)}
                        icon="⏳"
                    />
                </Animated.View>
            </ScrollView>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 50,
        paddingBottom: 100,
        alignItems: "center",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textDark,
    },
    errorTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.textDark,
        marginTop: 20,
        marginBottom: 8,
    },
    errorMessage: {
        fontSize: 14,
        color: COLORS.textMedium,
        marginBottom: 24,
    },
    retryButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.accent,
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    retryText: {
        color: "#FFF",
        fontWeight: "700",
        marginLeft: 8,
        fontSize: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        width: "100%",
        maxWidth: 600,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.textDark,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 4,
    },
    refreshButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.cardBg,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    noticeBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.cardBg,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 20,
        gap: 10,
        width: "100%",
        maxWidth: 600,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    offlineNotice: {
        borderLeftWidth: 4,
        borderLeftColor: COLORS.WARNING,
    },
    noticeText: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.textMedium,
    },
    mainStatusCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        padding: 32,
        marginBottom: 20,
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    statusIconWrapper: {
        marginBottom: 16,
    },
    statusLabel: {
        fontSize: 13,
        color: COLORS.textLight,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 8,
    },
    statusValue: {
        fontSize: 32,
        fontWeight: "900",
        marginBottom: 8,
    },
    statusHint: {
        fontSize: 13,
        color: COLORS.textMedium,
        textAlign: "center",
    },
    messageCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        width: "100%",
        maxWidth: 600,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    messageHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    messageTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.textDark,
    },
    messageText: {
        fontSize: 13,
        color: COLORS.textMedium,
        lineHeight: 18,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: 16,
        marginTop: 8,
        width: "100%",
        maxWidth: 600,
    },
    cardsGrid: {
        width: "100%",
        alignItems: "center",
        gap: 16,
        marginBottom: 20,
    },
});