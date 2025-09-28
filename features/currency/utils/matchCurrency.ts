import { CurrencyInfoType } from '../types/CurrencyInfo';

export const matchCurrency = (
  item: CurrencyInfoType,
  options: {
    query: string;
  }
): boolean => {
  const { query } = options;
  const normalizeQuery = query.toLocaleLowerCase();

  if (item.name.toLocaleLowerCase().startsWith(normalizeQuery)) {
    return true;
  }

  if (item.name.toLocaleLowerCase().indexOf(` ${normalizeQuery}`) >= 0) {
    return true;
  }

  if (item.symbol?.toLocaleLowerCase().startsWith(normalizeQuery)) {
    return true;
  }
  return false;
};
