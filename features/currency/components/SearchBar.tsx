import Spacer from '@/shared/components/Spacer';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
  query: string;
  title: string;
  onBack?: () => void;
  setQuery: (value: string) => void;
  onClear: () => void;
};
const SearchBar = ({
  style,
  query,
  title,
  onBack,
  setQuery,
  onClear,
}: Props) => {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const onSearch = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const canShowFocus = focus || query;

  return (
    <View
      style={[
        styles.containerDefault,
        style,
        styles.container,
        canShowFocus && styles.containerFocus,
      ]}
    >
      {/* Header back button */}
      <Ionicons name='arrow-back' size={24} color='black' onPress={onBack} />

      {/* Header title */}
      <View style={styles.bodyContainer}>
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          underlineColorAndroid={'transparent'}
          placeholder='Search...'
          style={{
            flex: 1,
            opacity: canShowFocus ? 1 : 0,
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {canShowFocus ? null : (
          <View style={styles.titleContainer}>
            <Spacer full />
            <Text
              style={{ fontWeight: 'bold', fontSize: 20 }}
              ellipsizeMode='tail'
              numberOfLines={1}
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
          onPress={onClear}
        />
      ) : (
        <Ionicons
          name='search-outline'
          size={24}
          color='black'
          onPress={onSearch}
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
});
