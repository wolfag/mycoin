import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CurrencyList from '../components/CurrencyList';
import SearchBar from '../components/SearchBar';
import { useCurrencyStore } from '../stores/currencyStore';
import { CurrencyModeType } from '../types/CurrencyMode';

const CurrencyListScreen = () => {
  const insets = useSafeAreaInsets();
  const { mode } = useLocalSearchParams<{ mode?: CurrencyModeType }>();
  const { datasets } = useCurrencyStore();

  const router = useRouter();

  const dataSource = useMemo(() => {
    if (mode) {
      return datasets[mode] || [];
    }
    return Object.values(datasets).flat();
  }, [mode, datasets]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <SearchBar style={{ marginTop: insets.top }} onBack={router.back} />
          ),
        }}
      />
      <CurrencyList data={dataSource} style={styles.list} />
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
