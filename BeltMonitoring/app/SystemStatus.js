import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db } from "../firebase";
import BottomNav from "../components/BottomNav";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const COLORS = {
    bg: "#E8F5E9",
    card: "#FFFFFF",
    green: "#4CAF50",
    red: "#F44336",
    orange: "#FF9800",
    text: "#1B5E20",
};

export default function SystemStatus() {
    const [lastDataTime, setLastDataTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const dimensions = Dimensions.get("window");

    useEffect(() => {
        const q = query(
            collection(db, "history"),
            orderBy("timestamp", "desc"),
            limit(1)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();
                setLastDataTime(new Date(data.timestamp.seconds * 1000));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const isDesktop = dimensions.width > 768;
    const titleSize = isDesktop ? 30 : 24;

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLORS.text} />
                <Text style={styles.loadingText}>Loading system status...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* PAGE CONTENT */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title moved to top */}
                <Text style={[styles.title, { fontSize: titleSize }]}>
                    System Status
                </Text>

                <StatusCard
                    icon="cloud-done"
                    label="Cloud Connection"
                    value="Connected"
                    color={COLORS.green}
                />

                <StatusCard
                    icon="sync"
                    label="Data Sync"
                    value="Receiving Data"
                    color={COLORS.green}
                />

                <StatusCard
                    icon="time"
                    label="Last Data Received"
                    value={lastDataTime ? lastDataTime.toLocaleString() : "No Data"}
                    color={lastDataTime ? COLORS.green : COLORS.orange}
                />

                <StatusCard
                    icon="analytics"
                    label="ML Model"
                    value="Active"
                    color={COLORS.green}
                />

                <StatusCard
                    icon="hardware-chip"
                    label="Data Source"
                    value="Simulated / Sensor"
                    color={COLORS.orange}
                />
            </ScrollView>

            {/* BOTTOM NAV */}
            <BottomNav />
        </View>
    );
}

/* ---------------- Status Card ---------------- */

const StatusCard = ({ icon, label, value, color }) => (
    <View style={[styles.card, { borderLeftColor: color }]}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={32} color={color} />
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={[styles.cardValue, { color }]}>{value}</Text>
        </View>
    </View>
);

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
        paddingTop: 20,
    },
    title: {
        textAlign: "center",
        fontWeight: "700",
        color: COLORS.text,
        marginTop: 20,
        marginBottom: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.text,
        fontWeight: "500",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        padding: 20,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        marginHorizontal: 20,
        marginBottom: 14,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardLabel: {
        fontSize: 13,
        color: "#666",
        fontWeight: "600",
        marginBottom: 4,
        letterSpacing: 0.2,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 22,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.bg,
    },
});