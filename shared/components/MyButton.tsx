import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
  titleProps?: TextStyle;
};
const MyButton = ({ title, titleProps, style, ...rest }: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Text {...titleProps}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
