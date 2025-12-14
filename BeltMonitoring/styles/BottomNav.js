// BottomNav.js
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Dimensions,
} from "react-native";
import { Link, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

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
        <View style={[styles.container, isDesktop && styles.containerDesktop]}>
            <Link href="/Dashboard" asChild>
                <TouchableOpacity style={styles.item}>
                    <Ionicons
                        name="home"
                        size={iconSize}
                        color={isActive("/Dashboard") ? "#1B5E20" : "#888"}
                    />
                    <Text
                        style={[
                            styles.label,
                            { fontSize },
                            isActive("/Dashboard") && styles.activeLabel
                        ]}
                    >
                        Dashboard
                    </Text>
                </TouchableOpacity>
            </Link>

            <Link href="/Alert" asChild>
                <TouchableOpacity style={styles.item}>
                    <Ionicons
                        name="warning"
                        size={iconSize}
                        color={isActive("/Alert") ? "#1B5E20" : "#888"}
                    />
                    <Text
                        style={[
                            styles.label,
                            { fontSize },
                            isActive("/Alert") && styles.activeLabel
                        ]}
                    >
                        Alert
                    </Text>
                </TouchableOpacity>
            </Link>

            <Link href="/History" asChild>
                <TouchableOpacity style={styles.item}>
                    <Ionicons
                        name="time"
                        size={iconSize}
                        color={isActive("/History") ? "#1B5E20" : "#888"}
                    />
                    <Text
                        style={[
                            styles.label,
                            { fontSize },
                            isActive("/History") && styles.activeLabel
                        ]}
                    >
                        History
                    </Text>
                </TouchableOpacity>
            </Link>

            <Link href="/Control" asChild>
                <TouchableOpacity style={styles.item}>
                    <Ionicons
                        name="settings"
                        size={iconSize}
                        color={isActive("/Control") ? "#1B5E20" : "#888"}
                    />
                    <Text
                        style={[
                            styles.label,
                            { fontSize },
                            isActive("/Control") && styles.activeLabel
                        ]}
                    >
                        Control
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
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
        paddingBottom: 12
    },
    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4
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

export default BottomNav;