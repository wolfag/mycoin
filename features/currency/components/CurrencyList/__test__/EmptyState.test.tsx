import { render, waitFor } from '@testing-library/react-native';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  it('renders UI', async () => {
    const { toJSON } = render(<EmptyState />);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
