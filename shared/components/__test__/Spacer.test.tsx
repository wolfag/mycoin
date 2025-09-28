import { render } from '@testing-library/react-native';

import Spacer from '../Spacer';

describe('Spacer', () => {
  it('renders default spacer', () => {
    const { toJSON } = render(<Spacer />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders vertical spacer', () => {
    const { getByTestId } = render(<Spacer vertical size={20} />);
    expect(getByTestId('Spacer')).toHaveStyle({
      height: 20,
      width: 0,
      flex: 0,
    });
  });

  it('renders full flex spacer', () => {
    const { getByTestId } = render(<Spacer full />);
    expect(getByTestId('Spacer')).toHaveStyle({
      height: 0,
      width: 12,
      flex: 1,
    });
  });
});
