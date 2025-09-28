import useDebounce from '@/shared/hooks/useDebounce';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CurrencyList from '../components/CurrencyList';
import SearchBar from '../components/SearchBar';
import { useCurrencyStore } from '../stores/currencyStore';
import { CurrencyModeType } from '../types/CurrencyMode';
import { matchCurrency } from '../utils/matchCurrency';

const CurrencyListScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { mode } = useLocalSearchParams<{ mode?: CurrencyModeType }>();
  const { datasets } = useCurrencyStore();

  const [query, setQuery] = useState('');
  const handleClearQuery = () => {
    setQuery('');
  };
  const queryDebounced = useDebounce(query);

  const title = (mode || 'All').toUpperCase();

  const dataSource = useMemo(() => {
    if (mode) {
      return datasets[mode] || [];
    }
    return Object.values(datasets).flat();
  }, [mode, datasets]);

  const filteredData = useMemo(() => {
    if (!queryDebounced) {
      return dataSource;
    }

    return dataSource.filter((item) =>
      matchCurrency(item, { query: queryDebounced })
    );
  }, [queryDebounced, dataSource]);

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
              onClear={handleClearQuery}
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
