import { useMemo } from 'react';
import { selectFilteredCurrencies } from '../selectors/currencySelectors';
import { useCurrencyStore } from '../stores/useCurrencyStore';
import { CurrencyModeType } from './../types/CurrencyMode';

export const useCurrencies = ({
  mode,
  query = '',
}: {
  mode?: CurrencyModeType;
  query?: string;
}) => {
  const datasets = useCurrencyStore((state) => state.datasets);

  const filteredData = useMemo(() => {
    return selectFilteredCurrencies({ datasets, mode, query });
  }, [datasets, mode, query]);

  return filteredData;
};
