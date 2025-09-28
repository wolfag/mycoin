import { render } from '@testing-library/react-native';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('renders first character of char in capital', () => {
    const { getByTestId } = render(<Avatar char='hello' />);
    expect(getByTestId('Avatar.Text')).toHaveTextContent('H');
  });

  it('uses default props correctly', () => {
    const { getByTestId } = render(<Avatar char='A' />);

    expect(getByTestId('Avatar')).toHaveStyle({
      backgroundColor: '#000',
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    });

    expect(getByTestId('Avatar.Text')).toHaveStyle({
      fontSize: 20,
      color: '#fff',
    });
  });

  it('applies medium size correctly', () => {
    const { getByTestId } = render(<Avatar char='M' size='medium' />);

    expect(getByTestId('Avatar')).toHaveStyle({
      backgroundColor: '#000',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    });

    expect(getByTestId('Avatar.Text')).toHaveStyle({
      fontSize: 40 / 1.5,
      color: '#fff',
    });
  });

  it('applies custom colors', () => {
    const { getByTestId } = render(
      <Avatar char='C' backgroundColor='red' textColor='yellow' />
    );

    expect(getByTestId('Avatar')).toHaveStyle({
      backgroundColor: 'red',
    });

    expect(getByTestId('Avatar.Text')).toHaveStyle({
      color: 'yellow',
    });
  });
});
