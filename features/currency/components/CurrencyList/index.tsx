import Spacer from '@/shared/components/Spacer';
import { getId } from '@/shared/utils/getId';
import { getTestId } from '@/shared/utils/getTestId';
import React, { useCallback } from 'react';
import { FlatList, FlatListProps, ListRenderItem } from 'react-native';
import { CurrencyInfoType } from '../../types/CurrencyInfo';
import EmptyState from './EmptyState';
import ItemRow from './ItemRow';

type Props = Omit<FlatListProps<CurrencyInfoType>, 'renderItem'> & {
  renderItem?: FlatListProps<CurrencyInfoType>['renderItem'];
};
const CurrencyList = ({ renderItem, ...rest }: Props) => {
  const handleRenderItem: ListRenderItem<CurrencyInfoType> = useCallback(
    ({ item }) => <ItemRow data={item} />,
    []
  );

  return (
    <FlatList
      keyExtractor={getId}
      renderItem={renderItem ?? handleRenderItem}
      ItemSeparatorComponent={() => <Spacer vertical size={12} />}
      ListEmptyComponent={() => <EmptyState />}
      {...getTestId('CurrencyList')}
      {...rest}
    />
  );
};

export default CurrencyList;
