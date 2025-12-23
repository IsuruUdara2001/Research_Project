import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const farmerProfile = {
  name: "K.M. Perera",
  village: "Haputale",
  farmSize: "2.5 acres",
  grade: "A",
  totalDeliveries: 156,
};

const performanceStats = {
  today: { deliveries: 1, totalWeight: 52.5, avgWeight: 52.5 },
  thisWeek: { deliveries: 3, totalWeight: 146.5, avgWeight: 48.8 },
  thisMonth: { deliveries: 12, totalWeight: 598.5, avgWeight: 49.9 },
  gradeDistribution: { A: 68, B: 78, C: 10 },
};

const DashboardView = () => {
  const totalGrades = performanceStats.gradeDistribution.A + 
                      performanceStats.gradeDistribution.B + 
                      performanceStats.gradeDistribution.C;
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Card with Avatar */}
      <View style={styles.headerCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {farmerProfile.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.gradeBadge}>
            <Text style={styles.gradeText}>{farmerProfile.grade}</Text>
          </View>
        </View>
        <Text style={styles.name}>{farmerProfile.name}</Text>
        <Text style={styles.location}>📍 {farmerProfile.village}</Text>
        <View style={styles.infoChips}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>🌾 {farmerProfile.farmSize}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>📦 {farmerProfile.totalDeliveries} total</Text>
          </View>
        </View>
      </View>

      {/* Today's Performance */}
      <View style={styles.performanceCard}>
        <Text style={styles.cardTitle}>📊 Today's Performance</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{performanceStats.today.deliveries}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{performanceStats.today.totalWeight}</Text>
            <Text style={styles.statLabel}>Total kg</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{performanceStats.today.avgWeight}</Text>
            <Text style={styles.statLabel}>Avg kg</Text>
          </View>
        </View>
      </View>

      {/* Period Stats */}
      <View style={styles.periodCard}>
        <Text style={styles.cardTitle}>📅 Period Overview</Text>
        
        <View style={styles.periodRow}>
          <View style={styles.periodLabel}>
            <Text style={styles.periodIcon}>📆</Text>
            <Text style={styles.periodText}>This Week</Text>
          </View>
          <View style={styles.periodStats}>
            <Text style={styles.periodValue}>{performanceStats.thisWeek.deliveries} deliveries</Text>
            <Text style={styles.periodSubtext}>{performanceStats.thisWeek.totalWeight} kg total • {performanceStats.thisWeek.avgWeight} kg avg</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.periodRow}>
          <View style={styles.periodLabel}>
            <Text style={styles.periodIcon}>📊</Text>
            <Text style={styles.periodText}>This Month</Text>
          </View>
          <View style={styles.periodStats}>
            <Text style={styles.periodValue}>{performanceStats.thisMonth.deliveries} deliveries</Text>
            <Text style={styles.periodSubtext}>{performanceStats.thisMonth.totalWeight} kg total • {performanceStats.thisMonth.avgWeight} kg avg</Text>
          </View>
        </View>
      </View>

      {/* Grade Distribution */}
      <View style={styles.gradeCard}>
        <Text style={styles.cardTitle}>🏆 Grade Distribution</Text>
        
        <View style={styles.gradeBar}>
          <View style={[styles.gradeSegment, styles.gradeA, { flex: performanceStats.gradeDistribution.A }]} />
          <View style={[styles.gradeSegment, styles.gradeB, { flex: performanceStats.gradeDistribution.B }]} />
          <View style={[styles.gradeSegment, styles.gradeC, { flex: performanceStats.gradeDistribution.C }]} />
        </View>

        <View style={styles.gradeLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.gradeA]} />
            <Text style={styles.legendText}>Grade A</Text>
            <Text style={styles.legendValue}>{performanceStats.gradeDistribution.A} ({Math.round(performanceStats.gradeDistribution.A / totalGrades * 100)}%)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.gradeB]} />
            <Text style={styles.legendText}>Grade B</Text>
            <Text style={styles.legendValue}>{performanceStats.gradeDistribution.B} ({Math.round(performanceStats.gradeDistribution.B / totalGrades * 100)}%)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.gradeC]} />
            <Text style={styles.legendText}>Grade C</Text>
            <Text style={styles.legendValue}>{performanceStats.gradeDistribution.C} ({Math.round(performanceStats.gradeDistribution.C / totalGrades * 100)}%)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  scrollContent: { padding: 16 },
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: { position: "relative", marginBottom: 16 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  gradeBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#fbbf24",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  gradeText: { fontSize: 14, fontWeight: "bold", color: "#fff" },
  name: { fontSize: 24, fontWeight: "bold", color: "#1f2937", marginBottom: 6 },
  location: { fontSize: 14, color: "#6b7280", marginBottom: 16 },
  infoChips: { flexDirection: "row", gap: 8 },
  chip: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: { fontSize: 13, color: "#4b5563", fontWeight: "500" },
  performanceCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#1f2937", marginBottom: 16 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  statBox: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statValue: { fontSize: 24, fontWeight: "bold", color: "#10b981", marginBottom: 4 },
  statLabel: { fontSize: 12, color: "#6b7280", textAlign: "center" },
  periodCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  periodRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  periodLabel: { flexDirection: "row", alignItems: "center", gap: 8, minWidth: 110 },
  periodIcon: { fontSize: 20 },
  periodText: { fontSize: 14, fontWeight: "600", color: "#4b5563" },
  periodStats: { flex: 1 },
  periodValue: { fontSize: 16, fontWeight: "bold", color: "#1f2937", marginBottom: 4 },
  periodSubtext: { fontSize: 13, color: "#6b7280" },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 16 },
  gradeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  gradeBar: {
    flexDirection: "row",
    height: 40,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  gradeSegment: { justifyContent: "center", alignItems: "center" },
  gradeA: { backgroundColor: "#10b981" },
  gradeB: { backgroundColor: "#fbbf24" },
  gradeC: { backgroundColor: "#ef4444" },
  gradeLegend: { gap: 12 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 14, color: "#4b5563", flex: 1 },
  legendValue: { fontSize: 14, fontWeight: "600", color: "#1f2937" },
});

export default DashboardView;