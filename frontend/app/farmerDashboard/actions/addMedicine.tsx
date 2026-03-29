import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterNavigation from '../FooterNavigation';
import { usePathname } from 'expo-router';

const AddVaccine = () => {
  const pathname = usePathname();

  const [vaccineName, setVaccineName] = useState('FMD');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('vaccine_history');
      if (data) setHistory(JSON.parse(data));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('vaccine_history', JSON.stringify(history));
  }, [history]);

  const handleAdd = () => {
    const item = {
      id: Date.now(),
      name: vaccineName,
      date: date.toLocaleDateString('bn-BD'),
    };

    setHistory(prev => [item, ...prev]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ভ্যাকসিন</Text>
        </View>

        <View style={styles.card}>
          <Picker selectedValue={vaccineName} onValueChange={setVaccineName}>
            <Picker.Item label="FMD" value="FMD" />
            <Picker.Item label="HS" value="HS" />
          </Picker>

          <TouchableOpacity onPress={() => setShow(true)}>
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              value={date}
              onChange={(e, d) => {
                setShow(false);
                if (d) setDate(d);
              }}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={{ color: '#fff' }}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterNavigation />
    </View>
  );
};

export default AddVaccine;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    backgroundColor: '#2e7d32',
    padding: 15,
  },

  headerTitle: { color: '#fff' },

  card: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  button: {
    marginTop: 10,
    backgroundColor: '#2e7d32',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
});
