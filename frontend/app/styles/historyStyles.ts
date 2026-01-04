import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E8F6E9",
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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

  /* Card Styles */
  card: {
    backgroundColor: "#629181",
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "#629181",
  },

  thumb: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  cardConfidence: {
    color: "#ffffffff",
    fontSize: 13,
  },

  cardDate: {
    color: "#ffffffff",
    fontSize: 12,
  },

  /* Empty State Styles */
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 10,
  },

  emptyTitle: {
    color: "#ecfdf5",
    fontSize: 18,
    fontWeight: "700",
  },

  emptySubtitle: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
  },
});
