import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Button from '../components/ui/button'

export default function LoginScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(phone, password);

    {role === 'farmer' 
    ? router.replace('/home')
    : router.replace('/marketplace')}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {role === 'farmer'
          ? 'খামারি হিসেবে লগইন করুন'
          : 'ক্রেতা হিসেবে লগইন করুন'}
      </Text>

      <TextInput
        placeholder="মোবাইল নাম্বার"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="পাসওয়ার্ড"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="লগইন"
        onPress={handleLogin}
      />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>পাসওয়ার্ড ভুলে গেছেন?</Text>

        <TouchableOpacity onPress={() => router.replace(`/reset-pass?role=${role}`)}>
          <Text style={styles.loginLink}>রিসেট করুন</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>নতুন অ্যাকাউন্ট তৈরি করুন।</Text>

        <TouchableOpacity onPress={() => router.replace(`/register?role=${role}`)}>
          <Text style={styles.loginLink}>নিবন্ধন করুন</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  loginText: {
    marginRight: 5,
  },

  loginLink: {
    color: 'green',
    fontWeight: 'bold',
  },
});
