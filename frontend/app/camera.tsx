// frontend/app/camera.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles/cameraCaptureStyles"; // or "../styles/..." if styles is outside app/

export default function CameraScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [facing] = useState<CameraType>("back");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // using any keeps TS simple for the ref
  const cameraRef = useRef<any>(null);

  // Ask for camera permission automatically once
  useEffect(() => {
    if (!permission) return;
    if (!permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Still loading camera permission object
  if (!permission) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <ActivityIndicator />
        <Text style={styles.permissionText}>Requesting camera permission…</Text>
      </SafeAreaView>
    );
  }

  // User denied camera permission
  if (!permission.granted && !permission.canAskAgain) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Ionicons name="alert-circle" size={40} color="#ef4444" />
        <Text style={styles.permissionText}>
          Camera permission was denied. Please enable it in your phone settings.
        </Text>
      </SafeAreaView>
    );
  }

  const handleTakePhoto = async () => {
    if (!cameraRef.current || !isCameraReady || isCapturing) return;

    try {
      setIsCapturing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      console.log("Captured photo URI:", photo.uri);

      // 👉 Go to Preprocessing Preview screen with this image
      router.push({
        pathname: "/identify",
       params: { imageUri: photo.uri },
      });
    } catch (error) {
      console.warn("Error capturing photo:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleBack = () => {
    router.back();
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
          <Ionicons name="chevron-back" size={22} color="#ececfdff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Capture Tea Leaf</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Main content */}
      <View style={styles.root}>
        {/* Camera preview with guide box */}
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            onCameraReady={() => setIsCameraReady(true)}
          >
            {/* Simple overlay with only the guide box */}
            <View style={styles.overlay}>
              <View style={styles.guideBox} />
            </View>
          </CameraView>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Guided Capture</Text>
          <Text style={styles.instructionsText}>
            Place a single tea leaf (or bud) inside the box. Ensure good
            lighting and keep the phone steady.
          </Text>
        </View>

        {/* Capture button */}
        <View style={styles.bottomBar}>
          <View className="bottomInfo" style={styles.bottomInfo}>
            <Ionicons name="leaf" size={18} color="#064e3b" />
            <Text style={styles.bottomInfoText}>
              AI will detect the tea leaf and extract color, texture and shape
              features.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.captureButtonOuter}
            onPress={handleTakePhoto}
            activeOpacity={0.85}
            disabled={!isCameraReady || isCapturing}
          >
            <View
              style={[
                styles.captureButtonInner,
                isCapturing && styles.captureButtonInnerActive,
              ]}
            >
              {isCapturing && (
                <ActivityIndicator size="small" color="#064e3b" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
