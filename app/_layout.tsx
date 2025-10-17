import { Slot } from 'expo-router';
import { I18nManager, Platform, View } from 'react-native';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProgressProvider } from '../context/ProgressContext';

export default function RootLayout() {
  useEffect(() => {
    try {
      if (!I18nManager.isRTL) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        if (Platform.OS !== 'web') {
          // On native, forcing RTL may require app reload by the user.
        }
      }
    } catch {}
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ProgressProvider>
          <View style={{ flex: 1, backgroundColor: '#0b0d10' }}>
            <Slot />
          </View>
        </ProgressProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


