import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E8F6E9",
  },
  root: {
    flex: 1,
    backgroundColor: "#E8F6E9",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#065f46",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#064e3b",
  },
  headerTitle: {
    color: "#000000ff",
    fontSize: 18,
    fontWeight: "600",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#629181",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#629181",
  },
  summaryLabel: {
    color: "#ffffffff",
    fontSize: 13,
  },
  summaryMainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  summaryValue: {
    color: "#ffffffff",
    fontSize: 24,
    fontWeight: "800",
  },
  summarySub: {
    color: "#ffffffff",
    fontSize: 12,
    marginTop: 4,
  },

  section: {
    marginTop: 18,
  },
  sectionTitle: {
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  // Quality distribution
  qualityContainer: {
    backgroundColor: "#629181",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#629181",
  },
  qualityItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  qualityLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: 90,
  },
  qualityDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  qualityLabel: {
    color: "#ffffffff",
    fontSize: 12,
  },
  qualityBarBackground: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#111827",
    overflow: "hidden",
  },
  qualityBarFill: {
    height: 8,
    borderRadius: 999,
  },
  qualityValue: {
    color: "#e5e7eb",
    fontSize: 13,
    width: 28,
    textAlign: "right",
  },

  // Weekly chart
  weeklyChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#629181",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#629181",
  },
  weeklyBarItem: {
    alignItems: "center",
    gap: 4,
  },
  weeklyBar: {
    width: 10,
    borderRadius: 999,
    backgroundColor: "#4ade80",
  },
  weeklyBarLabel: {
    color: "#ffffffff",
    fontSize: 11,
  },
  

  // Insights
  insightCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    backgroundColor: "#629181",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#629181",
    marginBottom: 10,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    color: "#ffffffff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  insightText: {
    color: "#ffffffff",
    fontSize: 12,
  },
});
