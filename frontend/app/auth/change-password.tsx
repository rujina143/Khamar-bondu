import react, { useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '@/app/components/button';

export default function ResetScreen(){
    const router = useRouter();
    const { role, reset } = useLocalSearchParams();
    const [oldpassword, setOldpassword ] = useState('');
    const [newpassword, setNewpassword ] = useState('');
    const [confirmnewpassword, setConfirmnewpassword ] = useState('');


    const handleChange = ()=>{

        router.replace(`/auth/login?role=${role}`);
    };

    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    পাসওয়ার্ড পরিবর্তন করুন।
                </Text>

                {!reset && (
                    <TextInput
                        placeholder="পুরানো পাসওয়ার্ড লিখুন"
                        secureTextEntry
                        style={styles.input}
                        value={oldpassword}
                        onChangeText={setOldpassword}
                    />
                )}

                <TextInput
                    placeholder= "নতুন পাসওয়ার্ড লিখুন"
                    secureTextEntry
                    style={styles.input}
                    value={newpassword}
                    onChangeText={setNewpassword}
                /><TextInput
                    placeholder= "পাসওয়ার্ড নিশ্চিত করুন"
                    secureTextEntry
                    style={styles.input}
                    value={confirmnewpassword}
                    onChangeText={setConfirmnewpassword}
                />

                <Button
                    title="পরিবর্তন সংরক্ষণ করুন"
                    onPress={handleChange}
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
    fontSize: 20,
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
