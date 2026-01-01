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
      route: "Dashboard",
    },
    {
      id: 2,
      title: "Farmer Management",
      icon: "people",
      route: "FarmerManagement",
    },
    {
      id: 3,
      title: "Analytics",
      icon: "pie-chart",
      route: "Analytics",
    },
    {
      id: 4,
      title: "Live Humidity",
      icon: "water",
      route: "LiveHumidity",
    },
    {
      id: 5,
      title: "Reports",
      icon: "document-text",
      route: "Reports",
    },
  ];

  const handleMenuPress = (item) => {
    console.log(`Navigating to ${item.title}`);
    navigation.navigate(item.route);
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
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => handleMenuPress(menuItems[0])}
              activeOpacity={0.85}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={menuItems[0].icon} size={36} color="#FFFFFF" />
              </View>
              <Text style={styles.menuTitle}>{menuItems[0].title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => handleMenuPress(menuItems[1])}
              activeOpacity={0.85}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={menuItems[1].icon} size={36} color="#FFFFFF" />
              </View>
              <Text style={styles.menuTitle}>{menuItems[1].title}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => handleMenuPress(menuItems[2])}
              activeOpacity={0.85}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={menuItems[2].icon} size={36} color="#FFFFFF" />
              </View>
              <Text style={styles.menuTitle}>{menuItems[2].title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => handleMenuPress(menuItems[3])}
              activeOpacity={0.85}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={menuItems[3].icon} size={36} color="#FFFFFF" />
              </View>
              <Text style={styles.menuTitle}>{menuItems[3].title}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => handleMenuPress(menuItems[4])}
              activeOpacity={0.85}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={menuItems[4].icon} size={36} color="#FFFFFF" />
              </View>
              <Text style={styles.menuTitle}>{menuItems[4].title}</Text>
            </TouchableOpacity>

            <View style={styles.emptyCard} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5",
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    marginTop: 18,
    paddingHorizontal: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  placeholder: {
    width: 40,
  },
  menuGrid: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  menuCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  emptyCard: {
    width: "48%",
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#6B9B8A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#6B9B8A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2C2C2C",
    textAlign: "center",
    lineHeight: 20,
  },
});