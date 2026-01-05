// frontend/app/batches.tsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles/batchAssignmentStyles";

type Batch = {
  id: string;
  name: string;
  grade: "Premium" | "High" | "Medium" | "Low";
  currentCount: number;
  capacity: number;
};

const BATCHES: Batch[] = [
  {
    id: "b1",
    name: "Premium Batch A",
    grade: "Premium",
    currentCount: 42,
    capacity: 60,
  },
  {
    id: "b2",
    name: "High Grade Batch B",
    grade: "High",
    currentCount: 35,
    capacity: 50,
  },
  {
    id: "b3",
    name: "Medium Batch C",
    grade: "Medium",
    currentCount: 27,
    capacity: 50,
  },
  {
    id: "b4",
    name: "Low Grade Batch D",
    grade: "Low",
    currentCount: 18,
    capacity: 50,
  },
];

function gradeColor(grade: Batch["grade"]) {
  switch (grade) {
    case "Premium":
      return "#22c55e";
    case "High":
      return "#0ea5e9";
    case "Medium":
      return "#eab308";
    case "Low":
      return "#f97316";
    default:
      return "#6b7280";
  }
}

export default function BatchAssignmentScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleAssignToBatch = (batch: Batch) => {
    console.log("Assign current leaf/batch to:", batch.name);
    // Later: open modal or perform actual assignment
  };

  const handleCreateBatch = () => {
    console.log("Create new batch");
    // Later: navigate to batch creation form
  };

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
        <Text style={styles.headerTitle}>Batch Assignment</Text>
        <TouchableOpacity
          style={styles.newBatchButton}
          onPress={handleCreateBatch}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={18} color="#F6EFE5" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.helperText}>
          Assign predicted leaves to processing batches based on quality grade
          and capacity.
        </Text>

        {BATCHES.map((batch) => {
          const utilization =
            batch.capacity > 0
              ? Math.min((batch.currentCount / batch.capacity) * 100, 100)
              : 0;

          return (
            <View key={batch.id} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardTitleRow}>
                  <View
                    style={[
                      styles.gradeDot,
                      { backgroundColor: gradeColor(batch.grade) },
                    ]}
                  />
                  <Text style={styles.cardTitle}>{batch.name}</Text>
                </View>
                <Text style={styles.gradeLabel}>{batch.grade}</Text>
              </View>

              <View style={styles.capacityRow}>
                <Ionicons name="cube" size={16} color="#a7f3d0" />
                <Text style={styles.capacityText}>
                  {batch.currentCount} / {batch.capacity} leaves assigned
                </Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${utilization}%` },
                  ]}
                />
              </View>
              <Text style={styles.utilizationText}>
                Utilization: {utilization.toFixed(0)}%
              </Text>

              <View style={styles.cardActionsRow}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => handleAssignToBatch(batch)}
                  activeOpacity={0.85}
                >
                  <Ionicons
                    name="swap-horizontal"
                    size={16}
                    color="#1bed13ff"
                  />
                  <Text style={styles.secondaryButtonText}>
                    Assign to this batch
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
