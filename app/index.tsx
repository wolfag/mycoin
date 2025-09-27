import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DemoRoute = () => {
  const handleClearDB = () => {};

  const handleInsertDB = () => {};

  const handleShowCrypto = () => {};

  const handleShowFiat = () => {};

  const handleShowAllCurrencies = () => {};

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
