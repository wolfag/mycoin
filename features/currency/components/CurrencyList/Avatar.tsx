import { getTestId } from '@/shared/utils/getTestId';
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

type Props = {
  char: string;
  backgroundColor?: ViewStyle['backgroundColor'];
  textColor?: TextStyle['color'];
  size?: 'small' | 'medium';
  testId?: string;
};
const Avatar = ({
  char,
  backgroundColor = '#000',
  textColor = '#fff',
  size = 'small',
  testId = 'Avatar',
}: Props) => {
  const boxSize = size === 'small' ? 30 : 40;
  const textSize = boxSize / 1.5;

  return (
    <View
      style={{
        backgroundColor,
        width: boxSize,
        height: boxSize,
        borderRadius: boxSize / 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...getTestId(testId)}
    >
      <Text
        style={{
          fontSize: textSize,
          color: textColor,
        }}
        {...getTestId('Avatar.Text')}
      >
        {char[0].toUpperCase()}
      </Text>
    </View>
  );
};

export default Avatar;
