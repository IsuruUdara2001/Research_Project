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

// Consistent spacing scale (multiples of 4)
const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
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
    const horizontalPadding = isDesktop ? 40 : SPACING.xl;

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
                        <View style={styles.statusCardInner}>
                            <View style={[styles.statusIconCircle, { backgroundColor: getColor(alerts.overall_status) }]}>
                                <Ionicons
                                    name={getStatusIcon(alerts.overall_status)}
                                    size={50}
                                    color="#FFFFFF"
                                />
                            </View>
                            <View style={styles.statusContent}>
                                <Text style={styles.statusLabel}>CURRENT STATUS</Text>
                                <Text style={[styles.statusValue, { color: getColor(alerts.overall_status) }]}>
                                    {alerts.overall_status}
                                </Text>
                                {alerts.overall_status === "CRITICAL" && (
                                    <View style={styles.statusHintContainer}>
                                        <Text style={styles.statusHintEmoji}>🚨</Text>
                                        <Text style={styles.statusHint}>Immediate attention needed</Text>
                                    </View>
                                )}
                                {alerts.overall_status === "WARNING" && (
                                    <View style={styles.statusHintContainer}>
                                        <Text style={styles.statusHintEmoji}>⚡</Text>
                                        <Text style={styles.statusHint}>Check system parameters</Text>
                                    </View>
                                )}
                                {alerts.overall_status === "NORMAL" && (
                                    <View style={styles.statusHintContainer}>
                                        <Text style={styles.statusHintEmoji}>✅</Text>
                                        <Text style={styles.statusHint}>All systems operational</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={[styles.statusGlow, { backgroundColor: getColor(alerts.overall_status) }]} />
                    </Animated.View>
                )}

                {/* Important Messages */}
                {alerts.ml_prediction && alerts.ml_prediction !== alerts.overall_status && (
                    <Animated.View style={[styles.predictionCard, { opacity: fadeAnim }]}>
                        <View style={styles.predictionIconCircle}>
                            <Ionicons name="analytics" size={32} color={COLORS.accent} />
                        </View>
                        <View style={styles.predictionContent}>
                            <Text style={styles.predictionLabel}>AI PREDICTION</Text>
                            <View style={styles.predictionValueContainer}>
                                <Text style={styles.predictionText}>ML predicts: </Text>
                                <Text style={[styles.predictionStatus, { color: getColor(alerts.ml_prediction) }]}>
                                    {alerts.ml_prediction}
                                </Text>
                            </View>
                            <Text style={styles.predictionHint}>
                                ⓘ Different from current status
                            </Text>
                        </View>
                        <View style={styles.predictionBadge}>
                            <Ionicons name="trending-up" size={20} color={COLORS.accent} />
                        </View>
                    </Animated.View>
                )}

                {alerts.future_message && (
                    <Animated.View style={[
                        styles.futureCard,
                        { opacity: fadeAnim }
                    ]}>
                        <View style={styles.futureCardInner}>
                            <View style={[styles.futureIconCircle, { backgroundColor: getColor(alerts.future_prediction) }]}>
                                <Ionicons name="time-outline" size={36} color="#FFFFFF" />
                            </View>
                            <View style={styles.futureContent}>
                                <Text style={styles.futureLabel}>FUTURE PREDICTION</Text>
                                <Text style={[styles.futureStatus, { color: getColor(alerts.future_prediction) }]}>
                                    {alerts.future_prediction}
                                </Text>
                                <View style={styles.futureMessageContainer}>
                                    <Ionicons name="information-circle-outline" size={18} color={COLORS.textMedium} />
                                    <Text style={styles.futureMessage}>{alerts.future_message}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.futureGlow, { backgroundColor: getColor(alerts.future_prediction) }]} />
                    </Animated.View>
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
        paddingTop: 48,
        paddingBottom: 100,
        alignItems: "center",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        padding: SPACING.xl,
    },
    loadingText: {
        marginTop: SPACING.lg,
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textDark,
    },
    errorTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.textDark,
        marginTop: SPACING.xl,
        marginBottom: SPACING.sm,
    },
    errorMessage: {
        fontSize: 14,
        color: COLORS.textMedium,
        marginBottom: SPACING.xxl,
    },
    retryButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.accent,
        paddingHorizontal: SPACING.xxl + 4, // 28
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
        marginLeft: SPACING.sm,
        fontSize: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SPACING.xxl,
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
        marginTop: SPACING.xs,
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
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: SPACING.md,
        marginBottom: SPACING.xl,
        gap: SPACING.sm,
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
        borderRadius: SPACING.xxl,
        marginBottom: SPACING.xxl,
        width: "100%",
        maxWidth: 600,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        position: "relative",
        overflow: "hidden",
    },
    statusCardInner: {
        flexDirection: "row",
        alignItems: "center",
        padding: SPACING.xxl + 4, // 28
        zIndex: 1,
    },
    statusIconCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        justifyContent: "center",
        alignItems: "center",
        marginRight: SPACING.xxl,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    statusContent: {
        flex: 1,
    },
    statusLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: SPACING.sm,
    },
    statusValue: {
        fontSize: 36,
        fontWeight: "900",
        marginBottom: SPACING.sm,
        letterSpacing: 0.5,
    },
    statusHintContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
    },
    statusHintEmoji: {
        fontSize: 18,
    },
    statusHint: {
        fontSize: 14,
        color: COLORS.textMedium,
        fontWeight: "600",
    },
    statusGlow: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: SPACING.sm,
        opacity: 0.9,
    },
    predictionCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: SPACING.xl,
        padding: SPACING.xxl,
        marginBottom: SPACING.xl,
        width: "100%",
        maxWidth: 600,
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: COLORS.accentLight,
    },
    predictionIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.accentLight,
        justifyContent: "center",
        alignItems: "center",
        marginRight: SPACING.lg,
    },
    predictionContent: {
        flex: 1,
    },
    predictionLabel: {
        fontSize: 11,
        color: COLORS.textLight,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 1.2,
        marginBottom: SPACING.sm,
    },
    predictionValueContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: SPACING.sm,
    },
    predictionText: {
        fontSize: 16,
        color: COLORS.textMedium,
        fontWeight: "600",
    },
    predictionStatus: {
        fontWeight: "900",
        fontSize: 20,
    },
    predictionHint: {
        fontSize: 13,
        color: COLORS.textLight,
        fontWeight: "500",
    },
    predictionBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.accentLight,
        justifyContent: "center",
        alignItems: "center",
    },
    futureCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: SPACING.xxl,
        marginBottom: SPACING.xl,
        width: "100%",
        maxWidth: 600,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        position: "relative",
        overflow: "hidden",
    },
    futureCardInner: {
        flexDirection: "row",
        alignItems: "center",
        padding: SPACING.xxl + 4, // 28
        zIndex: 1,
    },
    futureIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: SPACING.xl,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: SPACING.sm,
        elevation: 6,
    },
    futureContent: {
        flex: 1,
    },
    futureLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: SPACING.sm,
    },
    futureStatus: {
        fontSize: 28,
        fontWeight: "900",
        marginBottom: SPACING.md,
    },
    futureMessageContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: SPACING.sm,
        backgroundColor: COLORS.normalLight,
        padding: SPACING.md,
        borderRadius: SPACING.md,
    },
    futureMessage: {
        fontSize: 14,
        color: COLORS.textMedium,
        lineHeight: 20,
        fontWeight: "600",
        flex: 1,
    },
    futureGlow: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: SPACING.sm,
        opacity: 0.9,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: SPACING.lg,
        marginTop: SPACING.sm,
        width: "100%",
        maxWidth: 600,
    },
    cardsGrid: {
        width: "100%",
        alignItems: "center",
        gap: SPACING.lg,
        marginBottom: SPACING.xl,
    },
});