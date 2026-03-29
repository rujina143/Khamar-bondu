import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import Button from './../components/button';
export default function RegisterScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const userData = {
      role,
      name,
      phone,
      email,
      district,
      upazila,
      password,
    };

    console.log(userData);

    // registration er por login page e jabe
    router.replace(`/auth/login?role=${role}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>খামার বন্ধু</Text>

      <Text style={styles.subtitle}>
        {role === 'farmer'
          ? 'খামারি হিসেবে নিবন্ধন করুন'
          : 'ক্রেতা হিসেবে নিবন্ধন করুন'}
      </Text>

      <TextInput
        placeholder="আপনার নাম"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="০১XXXXXXXXX"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="ইমেইল"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="জেলা"
        style={styles.input}
        value={district}
        onChangeText={setDistrict}
      />

      <TextInput
        placeholder="উপজেলা"
        style={styles.input}
        value={upazila}
        onChangeText={setUpazila}
      />

      <TextInput
        placeholder="পাসওয়ার্ড"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>অ্যাকাউন্ট তৈরি করুন</Text>
      </TouchableOpacity> */}
      
      <Button
        title="অ্যাকাউন্ট তৈরি করুন"
        onPress={handleRegister}
      />

      {/* Login Link */}

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>ইতিমধ্যে অ্যাকাউন্ট আছে?</Text>

        <TouchableOpacity onPress={() => router.replace(`/auth/login?role=${role}`)}>
          <Text style={styles.loginLink}>লগইন করুন</Text>
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
    backgroundColor: '#e8efe8',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0a5c2b',
    marginBottom: 10,
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
  },

  input: {
    backgroundColor: '#fff',
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
