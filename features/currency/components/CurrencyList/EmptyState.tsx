import { getTestId } from '@/shared/utils/getTestId';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyState = () => {
  return (
    <View style={styles.container} {...getTestId('EmptyState')}>
      <AntDesign name='frown' size={60} color='grey' />
      <Text style={styles.firstText}>No Results</Text>
      <Text style={styles.secondText}>{`Try "MCO"`}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  firstText: {
    marginTop: 10,
  },
  secondText: {
    color: 'grey',
    marginTop: 5,
  },
});
