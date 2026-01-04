import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0fdf4",
  },

  /* ================= HEADER ================= */
  header: {
    height: 60,
    backgroundColor: "#f0fdf4",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  headerTitle: {
    color: "#000000ff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

 
  scrollContent: {
    padding: 16,
    backgroundColor: "#f0fdf4",
    paddingBottom: 160,
  },


  imageCard: {
    backgroundColor: "#2ac625ff",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 12,
    backgroundColor: "#629181",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  imageHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffffff",
    marginLeft: 8,
  },
  image: {
    width: "100%",
    height: height * 0.3,
  },
  placeholderImage: {
    width: "100%",
    height: height * 0.3,
    backgroundColor: "#629181",
    alignItems: "center",
    justifyContent: "center",
  },
  imageLabel: {
    padding: 12,
    fontSize: 14,
    color: "#ffffffff",
    textAlign: "center",
    backgroundColor: "#629181",
    borderTopWidth: 1,
    borderTopColor: "#629181",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },

  /* ================= RESULT CARD ================= */
  resultCard: {
    backgroundColor: "#629181",
    borderRadius: 20,
    marginBottom: 20,
    padding: 0,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 12,
    backgroundColor: "#f0fdf4",
    borderBottomWidth: 1,
    borderBottomColor: "#bbf7d0",
  },
  resultTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000000ff",
    marginLeft: 10,
  },
  resultStatus: {
    padding: 16,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  successBadge: {
    backgroundColor: "#16a34a",
  },
  statusText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  resultDescription: {
    fontSize: 15,
    color: "#ffffffff",
    lineHeight: 22,
  },

 

  /* ================= BOTTOM ACTIONS ================= */
  bottomActions: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 24 : 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 12,
    backgroundColor: "transparent",
  },
  buttonHalf: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainButton: {
    backgroundColor: "#629181",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#629181",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  mainButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffffff",
  },
  secondaryButton: {
    backgroundColor: "#629181",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#629181",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  secondaryButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffffff",
  },
});