import { CurrencyInfoType } from '@/features/currency/types/CurrencyInfo';
import Spacer from '@/shared/components/Spacer';
import { getTestId } from '@/shared/utils/getTestId';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import ItemAvatar from './ItemAvatar';
import ItemSuffix from './ItemSuffix';

type Props = {
  data: CurrencyInfoType;
  onPress?: (data: CurrencyInfoType) => void;
};
const ItemRow = ({ data, onPress }: Props) => {
  const handlePress = useCallback(() => {
    onPress?.(data);
  }, [data, onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      {...getTestId(`ItemRow.${data.symbol}.Container`)}
    >
      <ItemAvatar char={data.name} testId={`ItemRow.${data.symbol}.Avatar`} />
      <Spacer size={8} />
      <Text {...getTestId(`ItemRow.${data.symbol}.Name`)}>{data.name}</Text>
      <Spacer full />
      <ItemSuffix
        code={data.code}
        symbol={data.symbol}
        testId={`ItemRow.${data.symbol}.Container.Symbol`}
      />
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
