// frontend/app/history.tsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles/historyStyles";

export default function HistoryPage() {
  const router = useRouter();

  // Sample placeholder items → later you will load from backend / Firebase
  const historyItems = [
    {
      id: "1",
      uri: "https://picsum.photos/200/300",
      grade: "Premium",
      confidence: 93,
      date: "2025-02-01 10:25 AM",
    },
    {
      id: "2",
      uri: "https://picsum.photos/200/301",
      grade: "High",
      confidence: 87,
      date: "2025-01-30 04:10 PM",
    },
    {
      id: "3",
      uri: "https://picsum.photos/200/302",
      grade: "Medium",
      confidence: 74,
      date: "2025-01-29 09:12 AM",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleOpenItem = (item: any) => {
    router.push({
      pathname: "/result",
      params: {
        uri: item.uri,
        grade: item.grade,
        confidence: item.confidence.toString(),
      },
    });
  };

  const renderHistoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleOpenItem(item)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.uri }} style={styles.thumb} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.grade}</Text>

        <View style={styles.row}>
          <Ionicons name="stats-chart" size={14} color="#ffffffff" />
          <Text style={styles.cardConfidence}>
            {item.confidence}% confidence
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color="#ffffffff" />
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#ffffffff" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#ecfdf5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prediction History</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* If history empty */}
      {historyItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="albums-outline" size={50} color="#4b5563" />
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptySubtitle}>
            Your scanned tea leaves will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={historyItems}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
