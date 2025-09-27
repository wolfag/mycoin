import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
  onBack?: () => void;
};
const SearchBar = ({ style, onBack }: Props) => {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
  };

  return (
    <View style={[styles.containerDefault, style, styles.container]}>
      <Ionicons
        name='arrow-back'
        size={24}
        color='black'
        onPress={onBack}
        style={styles.backIcon}
      />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder='Search...'
        style={{
          flex: 1,
        }}
      />
      {!!query ? (
        <Ionicons
          name='close-outline'
          size={24}
          color='black'
          onPress={handleClear}
        />
      ) : (
        <Ionicons name='search-outline' size={24} color='black' />
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
  backIcon: {
    marginRight: 12,
  },
});
