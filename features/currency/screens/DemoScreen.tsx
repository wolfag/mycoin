import { CurrencyMode } from '@/features/currency/constants/CurrencyMode';

import { MOCK_CRYPTO_LIST } from '@/mocks/crypto.mock';
import { MOCK_FIAT_LIST } from '@/mocks/fiat.mock';
import MyButton from '@/shared/components/MyButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useCurrencyStore } from '../stores/useCurrencyStore';

const DemoScreen = () => {
  const router = useRouter();

  const insertDataset = useCurrencyStore((state) => state.insertDataset);
  const clearDataset = useCurrencyStore((state) => state.clearDataset);

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
      <MyButton
        style={styles.button}
        title='Clear DB'
        onPress={handleClearDB}
      />
      <MyButton
        style={styles.button}
        title='Insert DB'
        onPress={handleInsertDB}
      />
      <MyButton
        style={styles.button}
        title='Show Crypto'
        onPress={handleShowCrypto}
      />
      <MyButton
        style={styles.button}
        title='Show Fiat'
        onPress={handleShowFiat}
      />
      <MyButton
        style={styles.button}
        title='Show All Currencies'
        onPress={handleShowAllCurrencies}
      />
    </SafeAreaView>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 12,
  },
});
