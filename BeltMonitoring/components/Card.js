import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

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

    const cardWidth = isDesktop ? width * 0.35 : isTablet ? width * 0.4 : width * 0.85;
    const cardHeight = isDesktop ? 220 : isTablet ? 200 : height * 0.22;

    // Responsive text sizes
    const titleFontSize = isDesktop ? 20 : isTablet ? 18 : Math.min(width * 0.045, 18);
    const valueFontSize = isDesktop ? 42 : isTablet ? 38 : Math.min(width * 0.09, 36);
    const statusFontSize = isDesktop ? 15 : isTablet ? 14 : Math.min(width * 0.035, 14);

    const padding = isDesktop ? 30 : isTablet ? 25 : width * 0.05;
    const borderRadius = isDesktop ? 24 : isTablet ? 22 : width * 0.05;
    const marginBottom = isDesktop ? 12 : isTablet ? 10 : 10;

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: color,
                    width: cardWidth,
                    height: cardHeight,
                    paddingVertical: padding,
                    paddingHorizontal: padding,
                    borderRadius: borderRadius,
                    marginBottom: marginBottom,
                }
            ]}
        >
            <Text style={[styles.title, { fontSize: titleFontSize }]}>
                {icon} {title}
            </Text>
            <Text style={[styles.value, { fontSize: valueFontSize }]}>
                {value}
            </Text>
            {status && (
                <View style={[styles.statusBadge, { borderRadius: borderRadius * 0.5 }]}>
                    <Text style={[styles.statusText, { fontSize: statusFontSize }]}>
                        {status}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        color: "#fff",
        marginBottom: 10,
        fontWeight: "600",
        textAlign: "center",
    },
    value: {
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#fff",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    statusText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Card;