import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const cameraRef = useRef(null);
  const scaleValue = useRef(new Animated.Value(1)).current;

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9F9F6] px-6">
        <Text className="text-xl font-bold text-[#1A5D1A] mb-4">Camera Access Required</Text>
        <Text className="text-base text-gray-700 text-center mb-8 leading-6">
          Krushi needs your permission to use the camera in order to capture hyperspectral crop data.
        </Text>
        <TouchableOpacity
          className="bg-[#1A5D1A] px-8 py-4 rounded-xl shadow-md w-full active:bg-[#1A5D1A]/90"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold text-center text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 40,
    }).start();
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      // In a real app, logic for photo capture & processing goes here
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo captured successfully');
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView style={StyleSheet.absoluteFillObject} facing={facing} ref={cameraRef}>
        <View className="flex-1 justify-between">
          
          {/* Top Bar - Transparent */}
          <View className="flex-row justify-between items-center px-6 pt-16">
            <TouchableOpacity 
              className="p-3 bg-black/40 rounded-full border border-white/10" 
              onPress={toggleCameraFacing}
            >
              <Text className="text-white font-semibold">Flip</Text>
            </TouchableOpacity>
            <View className="px-5 py-2.5 bg-[#1A5D1A]/90 rounded-full shadow-lg border border-[#1A5D1A]/50">
              <Text className="text-white font-bold tracking-wide">Hyperspectral Mode</Text>
            </View>
            <View className="w-12" /> {/* Spacer for centering */}
          </View>

          {/* Bottom Bar - Frosted Glass Navigation */}
          {/* Using backdrop-blur for glassmorphism as requested */}
          <View className="flex-row justify-between items-center pb-12 pt-8 px-10 bg-black/30 backdrop-blur-md border-t border-white/10 rounded-t-[40px]">
            <TouchableOpacity className="items-center justify-center p-2">
              <Text className="text-white/80 font-medium text-base">Gallery</Text>
            </TouchableOpacity>

            {/* Glowing Capture Button with Smooth Animation */}
            <Animated.View 
              style={{ 
                transform: [{ scale: scaleValue }],
                shadowColor: '#F3CA52',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 15,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={takePicture}
                className="w-[84px] h-[84px] bg-[#F3CA52]/90 rounded-full justify-center items-center border-4 border-white/30"
              >
                {/* Inner ring for realism */}
                <View className="w-[68px] h-[68px] rounded-full border-2 border-white/60 bg-[#F3CA52]" />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity className="items-center justify-center p-2">
              <Text className="text-white/80 font-medium text-base">Analyze</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
