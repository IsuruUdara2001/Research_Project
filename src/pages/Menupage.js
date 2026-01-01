import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TeaBiMenuPage({ navigation }) {
  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: "grid",
      bgColor: "#D4E8D4",
      iconBgColor: "#52A052",
      route: "Dashboard",
    },
    {
      id: 2,
      title: "Farmer Management",
      icon: "people",
      bgColor: "#FFFFFF",
      iconBgColor: "#C8DCC8",
      route: "FarmerManagement",
    },
    {
      id: 3,
      title: "Analytics",
      icon: "pie-chart",
      bgColor: "#FFFFFF",
      iconBgColor: "#C8DCC8",
      route: "Analytics",
    },
    {
      id: 4,
      title: "",
      icon: "",
      bgColor: "#D4E8D4",
      iconBgColor: "#52A052",
      route: "ModelTraining",
    },
    {
      id: 5,
      title: "Reports",
      icon: "document-text",
      bgColor: "#D4E8D4",
      iconBgColor: "#52A052",
      route: "Reports",
    },
    {
      id: 6,
      title: "Settings",
      icon: "settings",
      bgColor: "#FFFFFF",
      iconBgColor: "#C8DCC8",
      route: "Settings",
    },
  ];

  const handleMenuPress = (item) => {
    console.log(`Navigating to ${item.title}`);
    // navigation.navigate(item.route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Menu</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuCard, { backgroundColor: item.bgColor }]}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.iconBgColor },
                ]}
              >
                <Ionicons name={item.icon} size={32} color="#FFFFFF" />
                 <Ionicons name={item.icon} size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3E8",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C2C2C",
  },
  placeholder: {
    width: 40,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  menuCard: {
    width: "48%",
    aspectRatio: 1.1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2C2C2C",
    textAlign: "center",
    lineHeight: 18,
  },
});
