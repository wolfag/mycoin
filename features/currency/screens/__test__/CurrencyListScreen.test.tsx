import { useLocalSearchParams, useRouter } from 'expo-router';

import { CurrencyMode } from '@/features/currency/constants/CurrencyMode';
import { render, waitFor } from '@testing-library/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CurrencyListScreen from '../CurrencyListScreen';

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

const mockUseCurrencyStoreValue = {
  datasets: mockDatasets,
  insertDataset: jest.fn(),
  clearDataset: jest.fn(),
};

jest.mock('@/features/currency/stores/useCurrencyStore', () => ({
  useCurrencyStore: jest.fn((selector) => selector(mockUseCurrencyStoreValue)),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
  Stack: {
    Screen: ({ options }: { options: any }) => {
      return options.header?.() ?? null;
    },
  },
}));

describe('CurrencyListScreen', () => {
  const mockRouterValue = {
    back: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouterValue);
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      mode: undefined,
    });
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all datasets when mode is undefined', async () => {
    const { queryByTestId, getByTestId } = render(<CurrencyListScreen />);
    await waitFor(() => {
      expect(queryByTestId('SearchBar.Title')).toHaveTextContent('ALL');
      expect(queryByTestId(`ItemRow.BTC.Container`)).toBeTruthy();
      expect(queryByTestId('ItemRow.$.Container')).toBeTruthy();
    });
  });

  it('renders crypto datasets when mode is crypto', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      mode: CurrencyMode.CRYPTO,
    });

    const { queryByTestId } = render(<CurrencyListScreen />);
    await waitFor(() => {
      expect(queryByTestId('SearchBar.Title')).toHaveTextContent('CRYPTO');
      expect(queryByTestId(`ItemRow.BTC.Container`)).toBeTruthy();
      expect(queryByTestId('ItemRow.$.Container')).toBeFalsy();
    });
  });

  it('renders fiat datasets when mode is fiat', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      mode: CurrencyMode.FIAT,
    });

    const { queryByTestId } = render(<CurrencyListScreen />);
    await waitFor(() => {
      expect(queryByTestId('SearchBar.Title')).toHaveTextContent('FIAT');
      expect(queryByTestId(`ItemRow.BTC.Container`)).toBeFalsy();
      expect(queryByTestId('ItemRow.$.Container')).toBeTruthy();
    });
  });
});
