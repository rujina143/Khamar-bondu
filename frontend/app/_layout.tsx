import { Stack } from 'expo-router';
import { FarmProvider } from './context/FarmContext'; // 🔥 import add

export default function RootLayout() {
  return (
    <FarmProvider>
      <Stack initialRouteName="splash">
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </FarmProvider>
  );
}
