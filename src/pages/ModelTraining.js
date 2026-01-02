import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModelTraining({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#2C2C2C" />
      </TouchableOpacity>
      <Text style={styles.title}>Model Training (placeholder)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  back: { position: 'absolute', top: 48, left: 16 },
  title: { fontSize: 18, fontWeight: '600' },
});
