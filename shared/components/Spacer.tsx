import React from 'react';
import { View } from 'react-native';

type Props = {
  size?: number;
  vertical?: boolean;
  full?: boolean;
};
const Spacer = ({ size = 12, vertical, full }: Props) => {
  return (
    <View
      style={{
        flex: full ? 1 : 0,
        height: vertical ? size : 0,
        width: vertical ? 0 : size,
      }}
    />
  );
};

export default Spacer;
