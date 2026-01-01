import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function StartPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Page</Text>
      <Text style={styles.subtitle}>(placeholder)</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('LoginPage')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
});
