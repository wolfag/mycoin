import { CurrencyMode } from '../../constants/CurrencyMode';
import { matchCurrency } from '../../utils/matchCurrency';
import {
  selectDataSource,
  selectFilteredCurrencies,
} from '../currencySelectors';

jest.mock('@/features/currency/utils/matchCurrency');
const mockMatchCurrency = matchCurrency as jest.Mock;

describe('currencySelectors', () => {
  const mockDatasets = {
    [CurrencyMode.CRYPTO]: [
      {
        id: 'BTC',
        name: 'Bitcoin',
        symbol: 'BTC',
      },
    ],
    [CurrencyMode.FIAT]: [
      {
        id: 'SGD',
        name: 'Singapore Dollar',
        symbol: '$',
        code: 'SGD',
      },
    ],
  };

  describe('selectDataSource', () => {
    it('should return an empty list if datasets is empty', () => {
      expect(
        selectDataSource({
          datasets: {},
        })
      ).toEqual([]);
    });
    it('should return an empty list if mode does not exist', () => {
      expect(
        selectDataSource({ datasets: mockDatasets, mode: 'unknown' })
      ).toEqual([]);
    });
    it('should return all data if mode not provided', () => {
      expect(
        selectDataSource({
          datasets: mockDatasets,
        })
      ).toEqual([
        ...mockDatasets[CurrencyMode.CRYPTO],
        ...mockDatasets[CurrencyMode.FIAT],
      ]);
    });
    it('should return fiat data if mode is fiat', () => {
      expect(
        selectDataSource({
          datasets: mockDatasets,
          mode: CurrencyMode.FIAT,
        })
      ).toEqual(mockDatasets[CurrencyMode.FIAT]);
    });
    it('should return crypto data if mode is crypto', () => {
      expect(
        selectDataSource({
          datasets: mockDatasets,
          mode: CurrencyMode.CRYPTO,
        })
      ).toEqual(mockDatasets[CurrencyMode.CRYPTO]);
    });
  });

  describe('selectFilteredCurrencies', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return all data when query is empty', () => {
      expect(
        selectFilteredCurrencies({
          datasets: mockDatasets,
          mode: CurrencyMode.CRYPTO,
        })
      ).toEqual(mockDatasets[CurrencyMode.CRYPTO]);
      expect(mockMatchCurrency).not.toHaveBeenCalled();
    });

    it('should filter data based on query using matchCurrency', () => {
      mockMatchCurrency.mockImplementation((item, { query }) =>
        `${item.name}`.toLowerCase().includes(`${query}`.toLowerCase())
      );
      expect(
        selectFilteredCurrencies({
          datasets: mockDatasets,
          query: 'bit',
        })
      ).toEqual([
        {
          id: 'BTC',
          name: 'Bitcoin',
          symbol: 'BTC',
        },
      ]);

      expect(mockMatchCurrency).toHaveBeenCalledTimes(2);
    });

    it('should handle undefined query safely', () => {
      expect(
        selectFilteredCurrencies({
          datasets: mockDatasets,
        })
      ).toEqual([
        ...mockDatasets[CurrencyMode.CRYPTO],
        ...mockDatasets[CurrencyMode.FIAT],
      ]);
      expect(mockMatchCurrency).not.toHaveBeenCalled();
    });
    it('should return empty list when no dataset matches the query', () => {
      mockMatchCurrency.mockReturnValue(false);

      expect(
        selectFilteredCurrencies({
          datasets: mockDatasets,
          query: 'none',
        })
      ).toEqual([]);
      expect(mockMatchCurrency).toHaveBeenCalledTimes(2);
    });
  });
});
