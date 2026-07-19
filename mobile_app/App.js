import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#F9F9F6', '#E8F5E9']}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex-1 justify-center items-center px-6 mt-10">
          <View className="items-center bg-white/80 p-8 rounded-3xl shadow-lg border border-[#1A5D1A]/10 w-full">
            <Text className="text-4xl font-extrabold text-[#1A5D1A] mb-2 text-center tracking-tight">
              Krushi
            </Text>
            <Text className="text-base text-gray-600 text-center mb-8 leading-6">
              Reflecting the hidden spectrum.{"\n"}Securing the harvest.
            </Text>
            
            <TouchableOpacity className="w-full bg-[#1A5D1A] py-4 rounded-xl shadow-md">
              <Text className="text-white text-center font-bold text-lg">
                Get Started
              </Text>
            </TouchableOpacity>
            
            <Text className="text-sm text-[#F3CA52] font-semibold mt-6">
              Voice-Driven Agritech
            </Text>
          </View>
        </SafeAreaView>
        <StatusBar style="dark" />
      </LinearGradient>
    </View>
  );
}
