import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { TextInput } from 'react-native';

jest.mock('@expo/vector-icons/Entypo', () => 'Entypo');
jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

jest.mock('expo-router', () => {
  return {
    useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
    useLocalSearchParams: () => ({}),
    Stack: ({ children }: { children: React.ReactNode }) => children,
  };
});

beforeAll(() => {
  jest
    .spyOn(TextInput.prototype, 'focus')
    .mockImplementation(function (this: any) {
      if (this.props?.onFocus) {
        this.props.onFocus({ nativeEvent: {} });
      }
    });
});
