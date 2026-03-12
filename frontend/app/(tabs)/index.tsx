import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>খামার বন্ধু</Text>

      <Text style={styles.subtitle}>
        গরুর খামার ব্যবস্থাপনা ও ক্রয়-বিক্রয়ের স্মার্ট সমাধান
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/register?role=farmer')}
      >
        <Text style={styles.buttonText}>খামারি হিসেবে শুরু করুন →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => router.push('/register?role=buyer')}
      >
        <Text style={styles.outlineText}>ক্রেতা হিসেবে শুরু করুন →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#e8efe8',
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0a5c2b',
    marginBottom: 20,
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#1c8f4a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: '#1c8f4a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  outlineText: {
    color: '#1c8f4a',
    fontWeight: 'bold',
  },
});
