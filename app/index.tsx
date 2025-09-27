import { CurrencyMode } from '@/features/currency/constants/CurrencyMode';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DemoRoute = () => {
  const router = useRouter();

  const handleClearDB = () => {};

  const handleInsertDB = () => {};

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
