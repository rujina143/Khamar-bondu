import react, { useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '@/app/components/button';

export default function ResetScreen(){
    const router = useRouter();
    const { role } = useLocalSearchParams();
    const [phone, setPhone] = useState('');

    const handleResetPass = ()=>{
        router.push(`/auth/get-otp?role=${role}`);
    };

    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {role === 'farmer'
                    ? 'খামারি পাসওয়ার্ড পুনরুদ্ধার করুন'
                    : 'ক্রেতা পাসওয়ার্ড পুনরুদ্ধার করুন'}
                </Text>

                <TextInput
                    placeholder="মোবাইল নাম্বার / ইমেইল লিখুন"
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                />

                <Button
                    title="রিসেট করুন"
                    onPress={handleResetPass}
                />
            </View>
        </>
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
});
