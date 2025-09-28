import { render, waitFor } from '@testing-library/react-native';
import ItemSuffix from '../ItemSuffix';

describe('ItemSuffix', () => {
  it('renders symbol when code is undefined', async () => {
    const { getByText } = render(<ItemSuffix symbol='$' />);

    await waitFor(() => {
      expect(getByText('$')).toBeTruthy();
    });
  });

  it('does not render anything when code exists', async () => {
    const { queryByText } = render(<ItemSuffix code='USD' symbol='$' />);

    await waitFor(() => {
      expect(queryByText('$')).toBeNull();
    });
  });

  it('renders undefined symbol gracefully', async () => {
    const { queryByText, getByTestId } = render(
      <ItemSuffix symbol={undefined} />
    );

    await waitFor(() => {
      expect(queryByText('undefined')).toBeNull();
    });
  });
});
