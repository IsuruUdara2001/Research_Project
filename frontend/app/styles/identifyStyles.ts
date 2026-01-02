// frontend/app/styles/identifyStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#022c22",
  },

  /* Header */
  header: {
    height: 56,
    backgroundColor: "#022c22",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#ecfdf5",
    fontSize: 16,
    fontWeight: "700",
  },

  /* Content */
  scrollContent: {
    padding: 16,
    backgroundColor: "#f0fdf4",
    paddingBottom: 120, // space for buttons
  },

  /* Image Card */
  imageCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 12,
  },
  imageLabel: {
    marginTop: 10,
    fontSize: 14,
    color: "#064e3b",
    fontWeight: "600",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
  },

  /* Result Card */
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  successCard: {
    borderLeftWidth: 6,
    borderLeftColor: "#22c55e",
  },
  errorCard: {
    borderLeftWidth: 6,
    borderLeftColor: "#ef4444",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },
  resultHint: {
    marginTop: 8,
    fontSize: 14,
    color: "#065f46",
    textAlign: "center",
  },

  /* Bottom Buttons */
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#022c22",
    gap: 12,
  },
  buttonHalf: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
  },
  mainButton: {
    backgroundColor: "#86efac",
  },
  mainButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#022c22",
  },
  secondaryButton: {
    backgroundColor: "#064e3b",
  },
  secondaryButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#e5e7eb",
  },
});
