import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Camera as CameraIcon } from 'lucide-react-native';
import { COLORS, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';

interface ColorAnalysis {
  primary: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  percentages: {
    [key: string]: number;
  };
}

export default function AnalyzeColorsScreen() {
  const router = useRouter();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<ColorAnalysis | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>We need your permission to use the camera</Text>
          <Pressable style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const analyzeImage = async (base64Image: string) => {
    try {
      const response = await fetch('/api/analyze-colors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const takePicture = async () => {
    if (!cameraRef) return;

    try {
      setAnalyzing(true);
      const photo = await cameraRef.takePictureAsync();
      
      // Resize the image to reduce upload size
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 800 } }],
        { base64: true }
      );

      if (manipulatedImage.base64) {
        await analyzeImage(manipulatedImage.base64);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      setAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={COLORS.white} />
        </Pressable>
        <Text style={styles.title}>Analyze Colors</Text>
        <View style={styles.placeholder} />
      </View>

      <Camera
        ref={setCameraRef}
        style={styles.camera}
        type={CameraType.back}
      >
        {analyzing ? (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color={COLORS.white} />
            <Text style={styles.analyzingText}>Analyzing colors...</Text>
          </View>
        ) : results ? (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Color Analysis</Text>
            <View style={styles.colorResult}>
              <View style={[styles.colorSwatch, { backgroundColor: results.primary }]} />
              <Text style={styles.colorText}>
                Primary: {results.primary} ({results.percentages[results.primary]}%)
              </Text>
            </View>
            {results.secondary && (
              <View style={styles.colorResult}>
                <View style={[styles.colorSwatch, { backgroundColor: results.secondary }]} />
                <Text style={styles.colorText}>
                  Secondary: {results.secondary} ({results.percentages[results.secondary]}%)
                </Text>
              </View>
            )}
            {results.tertiary && (
              <View style={styles.colorResult}>
                <View style={[styles.colorSwatch, { backgroundColor: results.tertiary }]} />
                <Text style={styles.colorText}>
                  Tertiary: {results.tertiary} ({results.percentages[results.tertiary]}%)
                </Text>
              </View>
            )}
            {results.quaternary && (
              <View style={styles.colorResult}>
                <View style={[styles.colorSwatch, { backgroundColor: results.quaternary }]} />
                <Text style={styles.colorText}>
                  Quaternary: {results.quaternary} ({results.percentages[results.quaternary]}%)
                </Text>
              </View>
            )}
          </View>
        ) : null}
      </Camera>

      <View style={styles.footer}>
        <Pressable
          style={[styles.captureButton, analyzing && styles.captureButtonDisabled]}
          onPress={takePicture}
          disabled={analyzing}
        >
          <CameraIcon size={32} color={COLORS.white} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
  },
  backButton: {
    padding: SPACING.small,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: COLORS.white,
  },
  placeholder: {
    width: 40,
  },
  camera: {
    flex: 1,
  },
  footer: {
    padding: SPACING.medium,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  permissionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.medium,
  },
  permissionButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.darkBlue,
  },
  analyzingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.white,
    marginTop: SPACING.medium,
  },
  resultsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: SPACING.large,
  },
  resultsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: COLORS.white,
    marginBottom: SPACING.large,
  },
  colorResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.medium,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  colorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
});