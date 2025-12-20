import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#022c22",
  },
  root: {
    flex: 1,
    backgroundColor: "#022c22",
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
    color: "#ecfdf5",
    fontSize: 18,
    fontWeight: "600",
  },
  newBatchButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#a7f3d0",
    alignItems: "center",
    justifyContent: "center",
  },

  helperText: {
    color: "#d1fae5",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#064e3b",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#065f46",
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  gradeDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  cardTitle: {
    color: "#ecfdf5",
    fontSize: 15,
    fontWeight: "700",
  },
  gradeLabel: {
    color: "#a7f3d0",
    fontSize: 13,
    fontWeight: "600",
  },

  capacityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  capacityText: {
    color: "#d1fae5",
    fontSize: 13,
  },

  progressBackground: {
    marginTop: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#022c22",
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#4ade80",
  },
  utilizationText: {
    marginTop: 4,
    color: "#e5e7eb",
    fontSize: 12,
  },

  cardActionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "600",
  },
});
