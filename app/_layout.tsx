import { Stack } from 'expo-router';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='currency-list' options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
