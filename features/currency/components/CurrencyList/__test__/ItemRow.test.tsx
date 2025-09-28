import { CurrencyInfoType } from '@/features/currency/types/CurrencyInfo';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ItemRow from '../ItemRow';

describe('ItemRow', () => {
  const mockData: CurrencyInfoType = {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: 'BTC',
  };

  const mockProps = {
    data: mockData,
    onPress: jest.fn(),
  };

  const setup = (overrideProps?: any) => {
    return render(<ItemRow {...mockProps} {...overrideProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders currency name and avatar', async () => {
    const { queryByTestId } = setup();

    await waitFor(() => {
      expect(queryByTestId(`ItemRow.${mockData.symbol}.Avatar`)).toBeTruthy();
      expect(
        queryByTestId(`ItemRow.${mockData.symbol}.Name`)
      ).toHaveTextContent(mockData.name);
    });
  });

  it('calls onPress with data when pressed', async () => {
    const { queryByTestId } = setup();

    const component = await waitFor(() => {
      return queryByTestId(`ItemRow.${mockData.symbol}.Container`);
    });
    fireEvent.press(component);
    expect(mockProps.onPress).toHaveBeenCalledWith(mockData);
  });

  it('does NOT show symbol if data.code is exists', async () => {
    const { queryByTestId } = setup({
      data: {
        ...mockData,
        code: '123',
      },
    });

    await waitFor(() => {
      expect(
        queryByTestId(`ItemRow.${mockData.symbol}.Container.Symbol`)
      ).toBeFalsy();
    });
  });

  it('shows symbol if data.code is not exist', async () => {
    const { queryByTestId } = setup();

    await waitFor(() => {
      expect(
        queryByTestId(`ItemRow.${mockData.symbol}.Container.Symbol`)
      ).toBeTruthy();
    });
  });
});
