// Control.js
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Platform,
    Dimensions,
} from "react-native";
import { Link, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const BottomNav = () => {
    const pathname = usePathname();
    const isActive = (route) => pathname === route;
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions(window);
        });
        return () => subscription?.remove();
    }, []);

    const isDesktop = dimensions.width > 768;
    const iconSize = isDesktop ? 24 : Math.min(dimensions.width * 0.06, 26);
    const fontSize = isDesktop ? 12 : Math.min(dimensions.width * 0.027, 11);

    return (
        <View style={[navStyles.container, isDesktop && navStyles.containerDesktop]}>
            <Link href="/Dashboard" asChild>
                <TouchableOpacity style={navStyles.item}>
                    <Ionicons name="home" size={iconSize} color={isActive("/Dashboard") ? "#1B5E20" : "#888"} />
                    <Text style={[navStyles.label, { fontSize }, isActive("/Dashboard") && navStyles.activeLabel]}>Dashboard</Text>
                </TouchableOpacity>
            </Link>

            <Link href="/Alert" asChild>
                <TouchableOpacity style={navStyles.item}>
                    <Ionicons name="warning" size={iconSize} color={isActive("/Alert") ? "#1B5E20" : "#888"} />
                    <Text style={[navStyles.label, { fontSize }, isActive("/Alert") && navStyles.activeLabel]}>Alert</Text>
                </TouchableOpacity>
            </Link>

            <Link href="/History" asChild>
                <TouchableOpacity style={navStyles.item}>
                    <Ionicons name="time" size={iconSize} color={isActive("/History") ? "#1B5E20" : "#888"} />
                    <Text style={[navStyles.label, { fontSize }, isActive("/History") && navStyles.activeLabel]}>History</Text>
                </TouchableOpacity>
            </Link>

            <Link href="/Control" asChild>
                <TouchableOpacity style={navStyles.item}>
                    <Ionicons name="settings" size={iconSize} color={isActive("/Control") ? "#1B5E20" : "#888"} />
                    <Text style={[navStyles.label, { fontSize }, isActive("/Control") && navStyles.activeLabel]}>Control</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default function Control() {
    const [motorRunning, setMotorRunning] = useState(false);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions(window);
        });
        return () => subscription?.remove();
    }, []);

    const toggleMotor = async () => {
        const command = motorRunning ? "stop" : "start";
        try {
            await addDoc(collection(db, "motor_commands"), {
                command,
                timestamp: serverTimestamp(),
            });
            Alert.alert("Success", `Motor ${command} command sent`);
            setMotorRunning(!motorRunning);
        } catch (error) {
            Alert.alert("Error", "Could not send command");
        }
    };

    const isDesktop = dimensions.width > 768;
    const isTablet = dimensions.width > 600 && dimensions.width <= 768;

    const titleSize = isDesktop ? 36 : isTablet ? 32 : Math.min(dimensions.width * 0.085, 32);
    const statusTextSize = isDesktop ? 24 : isTablet ? 22 : Math.min(dimensions.width * 0.059, 22);
    const buttonTextSize = isDesktop ? 24 : isTablet ? 22 : Math.min(dimensions.width * 0.059, 22);
    const statusPadding = isDesktop ? 30 : isTablet ? 26 : 24;
    const buttonPaddingV = isDesktop ? 24 : isTablet ? 22 : 20;
    const buttonPaddingH = isDesktop ? 80 : isTablet ? 75 : 70;

    return (
        <View style={styles.container}>
            <View style={[styles.contentWrapper, isDesktop && styles.contentWrapperDesktop]}>
                <View style={styles.content}>
                    <Text style={[styles.title, { fontSize: titleSize }]}>Motor Control</Text>

                    <View style={[styles.statusCard, { paddingVertical: statusPadding }]}>
                        <Text style={[styles.statusText, { fontSize: statusTextSize }]}>
                            Motor is:{" "}
                            <Text style={motorRunning ? styles.running : styles.stopped}>
                                {motorRunning ? "Running" : "Stopped"}
                            </Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.bigButton,
                            motorRunning ? styles.stopButton : styles.startButton,
                            {
                                paddingVertical: buttonPaddingV,
                                paddingHorizontal: buttonPaddingH
                            }
                        ]}
                        onPress={toggleMotor}
                    >
                        <Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>
                            {motorRunning ? "Stop Motor" : "Start Motor"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F5E9"
    },
    contentWrapper: {
        flex: 1,
        width: '100%',
    },
    contentWrapperDesktop: {
        maxWidth: 1200,
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40
    },
    title: {
        fontWeight: "700",
        color: "#1B5E20",
        marginBottom: 50
    },
    statusCard: {
        backgroundColor: "#FFF",
        paddingHorizontal: 50,
        borderRadius: 24,
        elevation: 8,
        marginBottom: 60,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    statusText: {
        color: "#1B5E20"
    },
    running: {
        color: "#4CAF50",
        fontWeight: "bold"
    },
    stopped: {
        color: "#F44336",
        fontWeight: "bold"
    },
    bigButton: {
        borderRadius: 34,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    startButton: {
        backgroundColor: "#4CAF50"
    },
    stopButton: {
        backgroundColor: "#F44336"
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600"
    },
});

const navStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#C8E6C9",
        paddingBottom: Platform.OS === "ios" ? 25 : 12,
        paddingTop: 8,
        elevation: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    containerDesktop: {
        paddingVertical: 12,
        paddingBottom: 12,
    },
    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
    },
    label: {
        marginTop: 4,
        color: "#888",
        fontWeight: "600"
    },
    activeLabel: {
        color: "#1B5E20",
        fontWeight: "800"
    },
});