import { CurrencyMode } from '@/features/currency/constants/CurrencyMode';
import { useCurrencyStore } from '@/features/currency/stores/currencyStore';
import { MOCK_CRYPTO_LIST } from '@/mocks/crypto.mock';
import { MOCK_FIAT_LIST } from '@/mocks/fiat.mock';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const DemoRoute = () => {
  const router = useRouter();

  const { insertDataset, clearDataset } = useCurrencyStore();

  const handleClearDB = () => {
    clearDataset(CurrencyMode.CRYPTO);
    clearDataset(CurrencyMode.FIAT);
    Toast.show({
      type: 'success',
      text2: 'Database cleared successfully',
      position: 'bottom',
    });
  };

  const handleInsertDB = () => {
    insertDataset(CurrencyMode.CRYPTO, MOCK_CRYPTO_LIST);
    insertDataset(CurrencyMode.FIAT, MOCK_FIAT_LIST);
    Toast.show({
      type: 'success',
      text2: 'Database inserted successfully',
      position: 'bottom',
    });
  };

  const handleShowCrypto = () => {
    router.push({
      pathname: '/currency-list',
      params: {
        mode: CurrencyMode.CRYPTO,
      },
    });
  };

  const handleShowFiat = () => {
    router.push({
      pathname: '/currency-list',
      params: {
        mode: CurrencyMode.FIAT,
      },
    });
  };

  const handleShowAllCurrencies = () => {
    router.push({
      pathname: '/currency-list',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title='Clear DB' onPress={handleClearDB} />
      <Button title='Insert DB' onPress={handleInsertDB} />
      <Button title='Show Crypto' onPress={handleShowCrypto} />
      <Button title='Show Fiat' onPress={handleShowFiat} />
      <Button title='Show All Currencies' onPress={handleShowAllCurrencies} />
    </SafeAreaView>
  );
};

export default DemoRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
