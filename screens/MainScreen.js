import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Main Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});

export default MainScreen;
