import { act } from 'react';
import { CurrencyMode } from '../../constants/CurrencyMode';
import { CurrencyInfoType } from '../../types/CurrencyInfo';
import { useCurrencyStore } from '../useCurrencyStore';

describe('useCurrencyStore', () => {
  const sampleCrypto: CurrencyInfoType[] = [
    {
      id: 'BTC',
      name: 'Bitcoin',
      symbol: 'BTC',
    },
  ];

  const sampleFiat: CurrencyInfoType[] = [
    {
      id: 'SGD',
      name: 'Singapore Dollar',
      symbol: '$',
      code: 'SGD',
    },
  ];

  beforeEach(() => {
    act(() => {
      useCurrencyStore.setState({
        datasets: {
          [CurrencyMode.CRYPTO]: [],
          [CurrencyMode.FIAT]: [],
        },
      });
    });
  });

  it('starts empty', () => {
    const state = useCurrencyStore.getState();
    expect(state.datasets).toEqual({
      [CurrencyMode.CRYPTO]: [],
      [CurrencyMode.FIAT]: [],
    });
  });

  it('insertDataset', () => {
    act(() => {
      useCurrencyStore
        .getState()
        .insertDataset(CurrencyMode.CRYPTO, sampleCrypto);
    });

    expect(useCurrencyStore.getState().datasets[CurrencyMode.CRYPTO]).toEqual(
      sampleCrypto
    );
    expect(useCurrencyStore.getState().datasets[CurrencyMode.FIAT]).toEqual([]);
  });

  it('clearDataset', () => {
    act(() => {
      useCurrencyStore
        .getState()
        .insertDataset(CurrencyMode.CRYPTO, sampleCrypto);

      useCurrencyStore.getState().insertDataset(CurrencyMode.FIAT, sampleFiat);
    });
    expect(useCurrencyStore.getState().datasets[CurrencyMode.CRYPTO]).toEqual(
      sampleCrypto
    );
    expect(useCurrencyStore.getState().datasets[CurrencyMode.FIAT]).toEqual(
      sampleFiat
    );

    act(() => {
      useCurrencyStore.getState().clearDataset(CurrencyMode.CRYPTO);
    });
    expect(useCurrencyStore.getState().datasets[CurrencyMode.CRYPTO]).toEqual(
      []
    );
    expect(useCurrencyStore.getState().datasets[CurrencyMode.FIAT]).toEqual(
      sampleFiat
    );
  });
});
