import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const Card = ({ title, value, status, color, icon }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions(window);
        });
        return () => subscription?.remove();
    }, []);

    const { width, height } = dimensions;

    // Calculate responsive sizes based on screen dimensions
    const isDesktop = width > 768;
    const isTablet = width > 600 && width <= 768;

    const cardWidth = isDesktop ? 500 : isTablet ? width * 0.7 : width * 0.9;
    const cardHeight = isDesktop ? 160 : isTablet ? 150 : 140;

    // Responsive text sizes
    const titleFontSize = isDesktop ? 16 : isTablet ? 15 : 14;
    const valueFontSize = isDesktop ? 36 : isTablet ? 32 : 28;
    const statusFontSize = isDesktop ? 13 : isTablet ? 12 : 11;
    const iconSize = isDesktop ? 48 : isTablet ? 44 : 40;

    const padding = isDesktop ? 24 : isTablet ? 20 : 18;

    // Get gradient colors based on status
    const getGradientColors = () => {
        if (status === "CRITICAL") {
            return ['#EF4444', '#DC2626'];
        } else if (status === "WARNING") {
            return ['#F59E0B', '#D97706'];
        } else {
            return ['#4CAF50', '#388E3C'];
        }
    };

    return (
        <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
                styles.card,
                {
                    width: cardWidth,
                    height: cardHeight,
                    padding: padding,
                }
            ]}
        >
            <View style={styles.cardContent}>
                {/* Left side - Icon and Title */}
                <View style={styles.leftSection}>
                    <Text style={[styles.icon, { fontSize: iconSize }]}>{icon}</Text>
                    <View style={styles.titleSection}>
                        <Text style={[styles.title, { fontSize: titleFontSize }]}>
                            {title}
                        </Text>
                        {status && (
                            <View style={styles.statusBadge}>
                                <Text style={[styles.statusText, { fontSize: statusFontSize }]}>
                                    {status}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Right side - Value */}
                <View style={styles.rightSection}>
                    <Text style={[styles.value, { fontSize: valueFontSize }]}>
                        {value}
                    </Text>
                </View>
            </View>

            {/* Decorative circles */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        overflow: "hidden",
        position: "relative",
    },
    cardContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1,
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    icon: {
        lineHeight: 48,
    },
    titleSection: {
        flex: 1,
    },
    title: {
        color: "#fff",
        fontWeight: "700",
        marginBottom: 6,
        opacity: 0.95,
    },
    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: 12,
    },
    statusText: {
        color: "#fff",
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    rightSection: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    value: {
        fontWeight: "900",
        color: "#fff",
        textAlign: "right",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    decorativeCircle1: {
        position: "absolute",
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        top: -30,
        right: -30,
    },
    decorativeCircle2: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        bottom: -20,
        left: -20,
    },
});

export default Card;