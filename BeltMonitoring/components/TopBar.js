// TopBar.js
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const TopBar = ({
    title = "Belt Monitor",
    showBack = false,
    showSettings = true,
    showNotifications = true,
    onSettingsPress,
    onNotificationPress
}) => {
    const router = useRouter();
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));
    const [notificationCount, setNotificationCount] = useState(3); // Example notification count

    const isDesktop = dimensions.width > 768;
    const isTablet = dimensions.width > 600 && dimensions.width <= 768;

    const titleSize = isDesktop ? 22 : isTablet ? 20 : Math.min(dimensions.width * 0.05, 18);
    const iconSize = isDesktop ? 26 : isTablet ? 24 : 22;

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        }
    };

    const handleSettings = () => {
        if (onSettingsPress) {
            onSettingsPress();
        } else {
            // Navigate to settings page (you can create this later)
            console.log("Navigate to Settings");
        }
    };

    const handleNotifications = () => {
        if (onNotificationPress) {
            onNotificationPress();
        } else {
            // Navigate to notifications page (you can create this later)
            console.log("Navigate to Notifications");
        }
    };

    return (
        <View style={styles.container}>
            {/* Left side - Back button or Logo */}
            <View style={styles.leftSection}>
                {showBack ? (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleBack}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={iconSize} color="#1B5E20" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.logoContainer}>
                        <Ionicons name="speedometer" size={iconSize} color="#1B5E20" />
                    </View>
                )}
            </View>

            {/* Center - Title */}
            <View style={styles.centerSection}>
                <Text style={[styles.title, { fontSize: titleSize }]} numberOfLines={1}>
                    {title}
                </Text>
            </View>

            {/* Right side - Settings & Notifications */}
            <View style={styles.rightSection}>
                {showNotifications && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleNotifications}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="notifications-outline" size={iconSize} color="#1B5E20" />
                        {notificationCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {notificationCount > 9 ? '9+' : notificationCount}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}

                {showSettings && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleSettings}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="settings-outline" size={iconSize} color="#1B5E20" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0,
        paddingBottom: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 100,
    },
    leftSection: {
        width: 80,
        alignItems: "flex-start",
    },
    centerSection: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    rightSection: {
        width: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
    },
    logoContainer: {
        padding: 8,
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        position: "relative",
    },
    title: {
        fontWeight: "700",
        color: "#1B5E20",
        textAlign: "center",
    },
    badge: {
        position: "absolute",
        top: 4,
        right: 4,
        backgroundColor: "#F44336",
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
    },
    badgeText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "700",
    },
});

export default TopBar;