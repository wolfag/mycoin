import { MOCK_CRYPTO_LIST } from '@/mocks/crypto.mock';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CurrencyList from '../components/CurrencyList';
import SearchBar from '../components/SearchBar';

const CurrencyListScreen = () => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState(MOCK_CRYPTO_LIST);

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <SearchBar style={{ marginTop: insets.top }} onBack={router.back} />
          ),
        }}
      />
      <CurrencyList data={data} style={styles.list} />
    </SafeAreaView>
  );
};

export default CurrencyListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    margin: 12,
  },
});
