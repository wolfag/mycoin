import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CurrencyList from '../components/CurrencyList';
import SearchBar from '../components/SearchBar';

import { useCurrencies } from '../hooks/useCurrencies';
import { CurrencyModeType } from '../types/CurrencyMode';

const CurrencyListScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { mode } = useLocalSearchParams<{ mode?: CurrencyModeType }>();

  const [query, setQuery] = useState('');

  const title = (mode || 'All').toUpperCase();

  const filteredData = useCurrencies({ mode, query });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <SearchBar
              style={{ marginTop: insets.top }}
              onBack={router.back}
              query={query}
              setQuery={setQuery}
              title={title}
            />
          ),
        }}
      />
      <CurrencyList data={filteredData} style={styles.list} />
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
