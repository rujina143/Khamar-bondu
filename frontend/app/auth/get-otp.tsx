import react, { useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '@/app/components/button';

export default function ResetScreen(){
    const router = useRouter();
    const { role } = useLocalSearchParams();
    const [otp, setOtp ] = useState('');

    const handleOpt = ()=>{

        router.push(`/auth/change-password?role=${role}&reset=true`);
    };

    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    পাসওয়ার্ড পুনরুদ্ধারের ইমেইলটি সফলভাবে পাঠানো হয়েছে।
                </Text>

                <Text style={styles.subtitle}>
                    আপনি ইমেইল এ একটি ওটিপি পেয়েছেন।
                </Text>

                <TextInput
                    placeholder= "ওটিপি লিখুন"
                    secureTextEntry
                    style={styles.input}
                    value={otp}
                    onChangeText={setOtp}
                />

                <Button
                    title="জমা দিন"
                    onPress={handleOpt}
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

  subtitle: {
    fontSize: 16,
    fontWeight: 'semibold',
    // textAlign: 'center',
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

});
