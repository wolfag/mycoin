import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { act } from 'react';
import SearchBar from '../SearchBar';

jest.mock('@/shared/hooks/useDebounce', () => ({
  __esModule: true,
  default: (fn: any) => fn,
}));

describe('SearchBar', () => {
  const mockProps = {
    query: '',
    title: 'title',
    onBack: jest.fn(),
    setQuery: jest.fn(),
  };

  const setup = (overrideProps?: any) => {
    return render(<SearchBar {...mockProps} {...overrideProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show title when no query and not focused', async () => {
    const { queryByTestId } = setup();

    const title = await waitFor(() => {
      return queryByTestId('SearchBar.Title');
    });
    expect(title).toBeVisible();
    expect(title).toHaveTextContent(mockProps.title);
  });

  it('should show search button when no query and not focused', async () => {
    const { queryByTestId } = setup();

    const searchBtn = await waitFor(() => {
      return queryByTestId('SearchBar.SearchButton');
    });
    expect(searchBtn).toBeVisible();
  });

  it('should call onBack when back button is pressed', async () => {
    const { queryByTestId } = setup();

    const backBtn = await waitFor(() => queryByTestId('SearchBar.BackButton'));
    fireEvent.press(backBtn);
    expect(mockProps.onBack).toHaveBeenCalled();
  });

  it('should show clear button when query is not empty, and can call setQuery when clear button is pressed', async () => {
    const { queryByTestId } = setup({
      query: 'query',
    });

    const clearBtn = await waitFor(() =>
      queryByTestId('SearchBar.ClearButton')
    );
    expect(clearBtn).toBeTruthy();
    fireEvent.press(clearBtn);
    expect(mockProps.setQuery).toHaveBeenCalledWith('');
  });

  it('should hide title when input is focused, and show title again when input is blurred', async () => {
    const { queryByTestId } = setup();

    await waitFor(() => {
      expect(queryByTestId('SearchBar.Title')).toBeVisible();
    });

    const searchBtn = await waitFor(() => {
      return queryByTestId('SearchBar.SearchButton');
    });
    act(() => {
      fireEvent.press(searchBtn);
    });

    await waitFor(() => {
      expect(queryByTestId('SearchBar.Title')).toBeNull();
    });

    const input = await waitFor(() => queryByTestId('SearchBar.TextInput'));
    act(() => fireEvent(input, 'blur'));
    await waitFor(() => {
      expect(queryByTestId('SearchBar.Title')).toBeVisible();
    });
  });

  it('updates input value and calls setQuery on change', () => {
    const { getByTestId } = setup();

    const input = getByTestId('SearchBar.TextInput');
    fireEvent.changeText(input, 'hello');

    expect(mockProps.setQuery).toHaveBeenCalledWith('hello');
    expect(input.props.value).toBe('hello');
  });
});
