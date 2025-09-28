import Spacer from '@/shared/components/Spacer';
import useDebounce from '@/shared/hooks/useDebounce';
import { getTestId } from '@/shared/utils/getTestId';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
  query: string;
  title: string;
  onBack: () => void;
  setQuery: (value: string) => void;
};
const SearchBar = ({ style, query, title, onBack, setQuery }: Props) => {
  const [inputValue, setInputValue] = useState(query);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const debouncedSetQuery = useDebounce(setQuery, 300);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const onSearch = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = useCallback(
    (text: string) => {
      setInputValue(text);
      debouncedSetQuery(text);
    },
    [debouncedSetQuery]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setInputValue('');
  }, [setQuery]);

  const canShowFocus = focus || query;

  return (
    <View
      style={[
        styles.containerDefault,
        style,
        styles.container,
        canShowFocus && styles.containerFocus,
      ]}
      {...getTestId('SearchBar.Container')}
    >
      {/* Header back button */}
      <Ionicons
        name='arrow-back'
        size={24}
        color='black'
        onPress={onBack}
        {...getTestId('SearchBar.BackButton')}
      />

      {/* Header title */}
      <View style={styles.bodyContainer}>
        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={handleChange}
          underlineColorAndroid={'transparent'}
          placeholder='Search...'
          style={{
            flex: 1,
            opacity: canShowFocus ? 1 : 0,
            padding: 5,
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          {...getTestId('SearchBar.TextInput')}
        />
        {canShowFocus ? null : (
          <View style={styles.titleContainer}>
            <Spacer full />
            <Text
              style={styles.title}
              ellipsizeMode='tail'
              numberOfLines={1}
              {...getTestId('SearchBar.Title')}
            >
              {title}
            </Text>
            <Spacer full />
          </View>
        )}
      </View>

      {/* Header tail button */}
      {!!query ? (
        <Ionicons
          name='close-outline'
          size={24}
          color='black'
          onPress={handleClear}
          {...getTestId('SearchBar.ClearButton')}
        />
      ) : (
        <Ionicons
          name='search-outline'
          size={24}
          color='black'
          onPress={onSearch}
          {...getTestId('SearchBar.SearchButton')}
        />
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  containerDefault: {
    padding: 12,
  },
  container: {
    flexDirection: 'row',
  },
  containerFocus: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  bodyContainer: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 12,
  },
  titleContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
