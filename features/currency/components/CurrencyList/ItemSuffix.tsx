import { getTestId } from '@/shared/utils/getTestId';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CurrencyInfoType } from '../../types/CurrencyInfo';

type Props = Pick<CurrencyInfoType, 'code' | 'symbol'> & {
  testId?: string;
};

const ItemSuffix = ({ code, symbol, testId = 'ItemSuffix' }: Props) => {
  const showSymbol = !code;
  if (!showSymbol) return null;

  return (
    <View style={styles.container} {...getTestId(testId)}>
      <Text>{symbol || ''}</Text>
      <Entypo name='chevron-right' size={24} color='black' />
    </View>
  );
};

export default ItemSuffix;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
