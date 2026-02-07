import Board from '@/components/Board';
import { useRewards } from '@/context/RewardContext';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const { completeTask } = useRewards();

  useEffect(() => {
    completeTask('econ_visit');
  }, []);

  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
});
