import { CurrencyInfoType } from '../types/CurrencyInfo';
import { CurrencyModeType } from '../types/CurrencyMode';
import { matchCurrency } from '../utils/matchCurrency';

export const selectDataSource = ({
  datasets,
  mode,
}: {
  datasets: Record<string, CurrencyInfoType[]>;
  mode?: CurrencyModeType;
}) => {
  if (mode) {
    return datasets[mode] || [];
  }
  return Object.values(datasets).flat();
};

export const selectFilteredCurrencies = ({
  datasets,
  mode,
  query,
}: {
  datasets: Record<string, CurrencyInfoType[]>;
  mode?: CurrencyModeType;
  query?: string;
}) => {
  const data = selectDataSource({ datasets, mode });
  if (!query) {
    return data;
  }
  return data.filter((item) => matchCurrency(item, { query }));
};
