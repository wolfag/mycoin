import { Platform } from 'react-native';

export const getTestId = (id: string) => {
  return Platform.select({
    ios: {
      testID: id,
    },
    android: {
      accessibilityLabel: id,
    },
  });
};
