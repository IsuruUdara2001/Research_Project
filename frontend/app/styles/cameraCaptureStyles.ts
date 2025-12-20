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
    fontSize: 16,
    fontWeight: "600",
  },

  cameraContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 10,
    marginTop: 8,
  },

  camera: {
    flex: 1,
  },

  // Clean overlay, no black layer
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  // The guide box only
  guideBox: {
    width: 240,
    height: 240,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#a7f3d0",
    backgroundColor: "transparent",
  },

  instructionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  instructionsTitle: {
    color: "#ecfdf5",
    fontSize: 16,
    fontWeight: "600",
  },

  instructionsText: {
    color: "#d1fae5",
    fontSize: 13,
    marginTop: 4,
  },

  bottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },

  bottomInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  bottomInfoText: {
    color: "#d1fae5",
    fontSize: 13,
    flex: 1,
  },

  captureButtonOuter: {
    alignSelf: "center",
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#a7f3d0",
    alignItems: "center",
    justifyContent: "center",
  },

  captureButtonInner: {
    width: 55,
    height: 55,
    borderRadius: 55,
    backgroundColor: "#a7f3d0",
  },

  captureButtonInnerActive: {
    backgroundColor: "#d1fae5",
  },

  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  permissionText: {
    color: "#ecfdf5",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
});
