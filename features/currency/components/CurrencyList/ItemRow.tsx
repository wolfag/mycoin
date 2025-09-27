import { CurrencyInfoType } from '@/features/currency/types/CurrencyInfo';
import Spacer from '@/shared/components/Spacer';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Avatar from './Avatar';

type Props = {
  data: CurrencyInfoType;
  onPress?: (data: CurrencyInfoType) => void;
};
const ItemRow = ({ data, onPress }: Props) => {
  const canShowSymbol = !data.code;

  return (
    <TouchableOpacity onPress={() => onPress?.(data)} style={styles.container}>
      <Avatar char={data.name[0]} />
      <Spacer size={8} />
      <Text>{data.name}</Text>
      <Spacer full />
      {canShowSymbol && (
        <>
          <Text>{data.symbol}</Text>
          <Entypo name='chevron-right' size={24} color='black' />
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ItemRow);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
