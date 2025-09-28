import { CurrencyInfoType } from '@/features/currency/types/CurrencyInfo';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import CurrencyList from '../index';

describe('CurrencyList/index', () => {
  const sampleData: CurrencyInfoType[] = [
    { id: '1', code: 'USD', name: 'US Dollar', symbol: '$' },
    { id: '2', code: 'EUR', name: 'Euro', symbol: '€' },
  ];

  it('renders list items correctly', async () => {
    const { getByTestId } = render(<CurrencyList data={sampleData} />);

    await waitFor(() => {
      expect(
        getByTestId(`ItemRow.${sampleData[0].symbol}.Container`)
      ).toBeTruthy();
      expect(
        getByTestId(`ItemRow.${sampleData[1].symbol}.Container`)
      ).toBeTruthy();
    });
  });

  it('renders empty state when data is empty', async () => {
    const { getByTestId } = render(<CurrencyList data={[]} />);

    await waitFor(() => {
      expect(getByTestId('EmptyState')).toBeTruthy();
    });
  });

  it('renders custom renderItem if provided', async () => {
    const CustomItem = ({ item }: { item: CurrencyInfoType }) => (
      <Text testID={`custom-${item.code}`}>{item.name}</Text>
    );

    const { getByTestId } = render(
      <CurrencyList data={sampleData} renderItem={CustomItem} />
    );

    await waitFor(() => {
      expect(getByTestId('custom-USD')).toBeTruthy();
      expect(getByTestId('custom-EUR')).toBeTruthy();
    });
  });

  it('renders default if renderItem is not provide', async () => {
    const { getByTestId } = render(
      <CurrencyList data={sampleData} renderItem={undefined} />
    );

    await waitFor(() => {
      expect(
        getByTestId(`ItemRow.${sampleData[0].symbol}.Container`)
      ).toBeTruthy();
      expect(
        getByTestId(`ItemRow.${sampleData[1].symbol}.Container`)
      ).toBeTruthy();
    });
  });
});
