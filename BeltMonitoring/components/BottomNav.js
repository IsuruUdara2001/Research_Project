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
    const iconSize = isDesktop ? 22 : Math.min(dimensions.width * 0.055, 24);
    const fontSize = isDesktop ? 9.5 : Math.min(dimensions.width * 0.023, 9);

    const navItems = [
        { href: "/Dashboard", icon: "grid", iconOutline: "grid-outline", label: "Dashboard" },
        { href: "/Alert", icon: "notifications", iconOutline: "notifications-outline", label: "Alerts" },
        { href: "/History", icon: "list", iconOutline: "list-outline", label: "History" },
        { href: "/SystemStatus", icon: "stats-chart", iconOutline: "stats-chart-outline", label: "Status" },
    ];

    return (
        <View style={[styles.container, isDesktop && styles.containerDesktop]}>
            {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                    <Link key={item.href} href={item.href} asChild>
                        <TouchableOpacity
                            style={styles.item}
                            activeOpacity={0.6}
                        >
                            <View style={[
                                styles.iconWrapper,
                                active && styles.activeIconWrapper
                            ]}>
                                <Ionicons
                                    name={active ? item.icon : item.iconOutline}
                                    size={iconSize}
                                    color={active ? "#FFFFFF" : "#7C8A85"}
                                />
                            </View>
                            <Text style={[
                                styles.label,
                                { fontSize },
                                active && styles.activeLabel
                            ]}>
                                {item.label}
                            </Text>
                            {active && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    </Link>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: Platform.OS === "ios" ? 20 : 8,
        paddingTop: 6,
        paddingHorizontal: 8,
        elevation: 25,
        shadowColor: "#1B5E20",
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        borderTopWidth: 0,
    },
    containerDesktop: {
        paddingVertical: 10,
        paddingBottom: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 3,
        position: "relative",
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    activeIconWrapper: {
        backgroundColor: "#2E7D32",
        shadowColor: "#1B5E20",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    label: {
        marginTop: 3,
        color: "#7C8A85",
        fontWeight: "600",
        letterSpacing: 0.3,
    },
    activeLabel: {
        color: "#1B5E20",
        fontWeight: "800",
    },
    activeIndicator: {
        position: "absolute",
        bottom: 0,
        width: 28,
        height: 2.5,
        backgroundColor: "#2E7D32",
        borderRadius: 2,
    },
});

export default BottomNav;