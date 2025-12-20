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
    paddingBottom: 20,
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
  imageCard: {
    marginTop: 4,
    backgroundColor: "#064e3b",
    borderRadius: 18,
    padding: 10,
    alignItems: "center",
  },
  leafImage: {
    width: "100%",
    height: 260,
    borderRadius: 14,
  },
  imageLabel: {
    marginTop: 8,
    color: "#d1fae5",
    fontSize: 13,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    color: "#ecfdf5",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  featureCard: {
    backgroundColor: "#022c22",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#064e3b",
  },
  featureHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  featureTitle: {
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: "600",
  },
  featureText: {
    color: "#e5e7eb",
    fontSize: 13,
    marginTop: 2,
  },
  featureValue: {
    fontWeight: "700",
    color: "#a7f3d0",
  },
  featureHint: {
    color: "#9ca3af",
    fontSize: 11,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
    marginBottom: 10,
  },
  buttonHalf: {
    flex: 1,
  },
  mainButton: {
    backgroundColor: "#a7f3d0",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  mainButtonText: {
    color: "#022c22",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#6b7280",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  secondaryButtonText: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#022c22",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  errorText: {
    color: "#e5e7eb",
    fontSize: 14,
    textAlign: "center",
  },
});
