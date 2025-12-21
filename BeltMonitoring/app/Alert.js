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
    textDark: "#1B5E20",
    textLight: "#558B2F",
    NORMAL: "#4CAF50",   // Green
    WARNING: "#F39C12",  // Yellow
    CRITICAL: "#F44336", // Red
    tipBackground: "#FFF3E0", // Light orange for the tip banner
    tipText: "#E65100",
    offlineBackground: "#FFECB3",
    offlineText: "#F57C00",
};

// In-memory cache for alert data
let cachedAlertData = null;

export default function Alert() {
    const [alerts, setAlerts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions(window);
        });
        return () => subscription?.remove();
    }, []);

    const fetchAlerts = async () => {
        if (!alerts) {
            setLoading(true);
        }

        try {
            const response = await fetch("http://192.168.3.98:5000/alerts");
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            setAlerts(data);
            setIsOffline(false);

            cachedAlertData = data;

            if (data.overall_status === "CRITICAL") {
                RNAlert.alert("CRITICAL ALERT", "System status is CRITICAL! Immediate attention required.");
            } else if (data.overall_status === "WARNING") {
                RNAlert.alert("WARNING", "System status is WARNING. Please check the parameters.");
            }
        } catch (error) {
            console.log("Fetch error:", error);

            if (cachedAlertData) {
                setAlerts(cachedAlertData);
                setIsOffline(true);
            } else {
                setAlerts(null);
                if (!alerts) {
                    RNAlert.alert("Error", "Could not fetch alerts from backend");
                }
            }
        } finally {
            setLoading(false);
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
            ]).start();
        }
    };

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 5000);
        return () => clearInterval(interval);
    }, []);

    const getColor = (status) => COLORS[status] || COLORS.NORMAL;

    const isDesktop = dimensions.width > 768;
    const isTablet = dimensions.width > 600 && dimensions.width <= 768;

    const titleSize = isDesktop ? 32 : isTablet ? 28 : Math.min(dimensions.width * 0.07, 26);
    const overallTextSize = isDesktop ? 20 : isTablet ? 18 : Math.min(dimensions.width * 0.048, 18);
    const paddingTop = isDesktop ? 40 : isTablet ? 35 : Math.min(dimensions.height * 0.075, 50);
    const horizontalPadding = isDesktop ? 40 : isTablet ? 30 : Math.min(dimensions.width * 0.053, 20);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLORS.textDark} />
                <Text style={[styles.loadingText, { color: COLORS.textDark }]}>
                    Loading alerts...
                </Text>
            </View>
        );
    }

    if (!alerts) {
        return (
            <View style={styles.loader}>
                <Ionicons name="cloud-offline-outline" size={64} color={COLORS.textDark} style={{ marginBottom: 20 }} />
                <Text style={[styles.title, { color: COLORS.textDark, fontSize: 18, marginBottom: 8 }]}>
                    No Data Available
                </Text>
                <Text style={[styles.subtitle, { color: COLORS.textLight, fontSize: 14, marginBottom: 20 }]}>
                    Backend is offline. No cached data available.
                </Text>
                <TouchableOpacity
                    onPress={fetchAlerts}
                    style={styles.retryButton}
                >
                    <Ionicons name="refresh" size={24} color={COLORS.textDark} />
                    <Text style={styles.retryText}>Tap to retry</Text>
                </TouchableOpacity>
                <BottomNav />
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop }]}>
            <View style={[styles.contentWrapper, isDesktop && styles.contentWrapperDesktop]}>
                <View style={styles.header}>
                    <Text style={[styles.title, { fontSize: titleSize, paddingHorizontal: horizontalPadding }]}>
                        Belt Alerts Dashboard
                    </Text>
                    <TouchableOpacity
                        onPress={fetchAlerts}
                        style={styles.refreshButton}
                    >
                        <Ionicons name="refresh" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                </View>

                {/* Offline Mode Banner */}
                {isOffline && (
                    <View style={[styles.offlineBanner, { marginHorizontal: horizontalPadding }]}>
                        <Ionicons name="cloud-offline" size={20} color={COLORS.offlineText} />
                        <Text style={styles.offlineText}>
                            Backend offline - Showing last known data
                        </Text>
                    </View>
                )}

                {/* Overall Condition */}
                {alerts?.overall_status && (
                    <Animated.View
                        style={[
                            styles.overallStatus,
                            {
                                backgroundColor: getColor(alerts.overall_status),
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }],
                                marginHorizontal: horizontalPadding,
                            }
                        ]}
                    >
                        <Text style={[styles.overallText, { fontSize: overallTextSize }]}>
                            Overall Condition: {alerts.overall_status}
                        </Text>
                    </Animated.View>
                )}

                {/* Tip banner if ML prediction differs */}
                {alerts?.ml_prediction && alerts?.overall_status && alerts.ml_prediction !== alerts.overall_status && (
                    <View style={[styles.tipBanner, { marginHorizontal: horizontalPadding }]}>
                        <Ionicons name="information-circle" size={20} color={COLORS.tipText} />
                        <Text style={styles.tipText}>
                            ML prediction ({alerts.ml_prediction}) differs from overall condition ({alerts.overall_status})
                        </Text>
                    </View>
                )}

                <ScrollView
                    style={[styles.cardsScrollView, { paddingHorizontal: horizontalPadding }]}
                    contentContainerStyle={styles.cardsContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <Card
                        title="Temperature"
                        value={`${alerts.temp ?? "-"}°C`}
                        status={alerts.temp_status ?? "NORMAL"}
                        color={getColor(alerts.temp_status)}
                        icon="🌡️"
                    />
                    <Card
                        title="Vibration"
                        value={`${alerts.vibration ?? "-"}g`}
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
                        value={alerts.ml_prediction ?? "NORMAL"}    // <-- changed
                        status={alerts.ml_prediction ?? "NORMAL"}   // <-- changed
                        color={getColor(alerts.ml_prediction)}     // <-- changed
                        icon="🤖"
                    />
                </ScrollView>
            </View>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    contentWrapper: {
        flex: 1
    },
    contentWrapperDesktop: {
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%'
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "500",
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    title: {
        fontWeight: "bold",
        color: COLORS.textDark,
        textAlign: "center",
        marginBottom: 16,
        flex: 1,
    },
    refreshButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    retryButton: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    retryText: {
        color: COLORS.textDark,
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 16,
    },
    offlineBanner: {
        backgroundColor: COLORS.offlineBackground,
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    offlineText: {
        color: COLORS.offlineText,
        fontWeight: "600",
        flex: 1,
    },
    overallStatus: {
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    overallText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
    tipBanner: {
        backgroundColor: COLORS.tipBackground,
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    tipText: {
        color: COLORS.tipText,
        fontWeight: "600",
        flex: 1,
    },
    cardsScrollView: {
        flex: 1
    },
    cardsContainer: {
        gap: 16,
        paddingVertical: 20,
        alignItems: "center",
        paddingBottom: 30
    },
});
