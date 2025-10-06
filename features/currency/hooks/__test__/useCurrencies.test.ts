import { renderHook } from '@testing-library/react-native';
import { CurrencyMode } from '../../constants/CurrencyMode';
import { useCurrencyStore } from '../../stores/useCurrencyStore';
import { useCurrencies } from '../useCurrencies';
import { selectFilteredCurrencies } from './../../selectors/currencySelectors';

jest.mock('@/features/currency/stores/useCurrencyStore');
jest.mock('@/features/currency/selectors/currencySelectors');

describe('useCurrencies', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    (useCurrencyStore as any as jest.Mock).mockImplementation((selector) =>
      selector({ datasets: mockDatasets })
    );
  });

  it('returns filtered data for given mode and query', () => {
    (selectFilteredCurrencies as jest.Mock).mockReturnValue([
      {
        id: 'BTC',
        name: 'Bitcoin',
        symbol: 'BTC',
      },
    ]);

    const { result } = renderHook(() =>
      useCurrencies({ mode: CurrencyMode.CRYPTO, query: 'btc' })
    );
    expect(result.current).toEqual([
      { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
    ]);
    expect(selectFilteredCurrencies).toHaveBeenCalledWith({
      datasets: mockDatasets,
      mode: CurrencyMode.CRYPTO,
      query: 'btc',
    });
  });

  it('returns all data when no mode and query provided', () => {
    (selectFilteredCurrencies as jest.Mock).mockReturnValue([
      ...mockDatasets[CurrencyMode.CRYPTO],
      ...mockDatasets[CurrencyMode.FIAT],
    ]);

    const { result } = renderHook(() => useCurrencies({}));

    expect(result.current).toEqual([
      ...mockDatasets[CurrencyMode.CRYPTO],
      ...mockDatasets[CurrencyMode.FIAT],
    ]);
    expect(selectFilteredCurrencies).toHaveBeenCalledWith({
      datasets: mockDatasets,
      mode: undefined,
      query: '',
    });
  });

  it('memoize result when inputs unchanged', () => {
    (selectFilteredCurrencies as jest.Mock).mockReturnValue([
      { code: 'BTC', name: 'Bitcoin' },
    ]);

    const { result, rerender } = renderHook(
      ({ mode, query }: { mode: string; query: string }) =>
        useCurrencies({ mode, query }),
      { initialProps: { mode: CurrencyMode.CRYPTO, query: '' } }
    );

    rerender({ mode: CurrencyMode.CRYPTO, query: '' });

    expect(selectFilteredCurrencies).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual([{ code: 'BTC', name: 'Bitcoin' }]);
  });

  it('recomputes result when mode or query changes', () => {
    (selectFilteredCurrencies as jest.Mock).mockReturnValue([]);

    const { result, rerender } = renderHook(
      ({ mode, query }: { mode: string; query: string }) =>
        useCurrencies({ mode, query }),
      { initialProps: { mode: CurrencyMode.FIAT, query: '' } }
    );

    rerender({ mode: CurrencyMode.CRYPTO, query: '' });
    rerender({ mode: CurrencyMode.CRYPTO, query: 'abc' });

    expect(selectFilteredCurrencies).toHaveBeenCalledTimes(3);
  });
});
