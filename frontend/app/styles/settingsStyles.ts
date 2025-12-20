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
    paddingBottom: 40,
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
    backgroundColor: "#064e3b",
    borderWidth: 1,
    borderColor: "#065f46",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#ecfdf5",
    fontSize: 18,
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#a7f3d0",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  rowItem: {
    backgroundColor: "#064e3b",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#065f46",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowLabel: {
    color: "#ecfdf5",
    fontSize: 15,
  },

  fontSizeRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
  fontSizeButton: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#4b5563",
  },
  fontSizeButtonActive: {
    backgroundColor: "#bbf7d0",
    borderColor: "#bbf7d0",
  },
  fontSizeButtonText: {
    color: "#022c22",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#065f46",
    marginVertical: 16,
  },

  navItem: {
    backgroundColor: "#064e3b",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#065f46",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#a7f3d0",
    fontSize: 13,
  },
  footerTextSmall: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
});
