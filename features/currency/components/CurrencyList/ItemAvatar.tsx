import React from 'react';
import Avatar from './Avatar';

type Props = {
  char?: string;
  testId?: string;
};
const ItemAvatar = ({ char, testId }: Props) => {
  const displayChar = char?.[0] ?? '?';
  return <Avatar char={displayChar} testId={testId} />;
};

export default ItemAvatar;
