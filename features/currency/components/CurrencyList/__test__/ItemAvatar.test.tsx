import { render } from '@testing-library/react-native';
import ItemAvatar from '../ItemAvatar';

describe('ItemAvatar', () => {
  it('renders first character of the provided string', () => {
    const { getByText } = render(<ItemAvatar char='Dollar' />);
    expect(getByText('D')).toBeTruthy();
  });

  it('renders "?" when char is undefined', () => {
    const { getByText } = render(<ItemAvatar />);
    expect(getByText('?')).toBeTruthy();
  });

  it('renders first character if single character string is provided', () => {
    const { getByText } = render(<ItemAvatar char='x' />);
    expect(getByText('X')).toBeTruthy();
  });
});
