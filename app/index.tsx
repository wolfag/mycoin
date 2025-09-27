import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Text, View } from 'react-native';

const Home = () => {
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      const res = await fetch('/api/currencies');
      const json = await res.json();
      return json;
    },
  });
  console.log({ data });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home</Text>
    </View>
  );
};

export default Home;
