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

type VaccineStatus = 'completed' | 'upcoming' | 'due';
type GroupType = 'bachur' | 'gavi' | 'shar';

type Vaccine = {
  id: number;
  name: string;
  date: string;
  nextDate: string;
  status: VaccineStatus;
};

const groups = [
  { key: 'bachur', label: 'বাছুর' },
  { key: 'gavi', label: 'গাভী' },
  { key: 'shar', label: 'ষাঁড় গরু' },
];

const vaccineList = ['FMD', 'HS', 'BQ', 'Anthrax'];

const vaccineSchedule: Record<string, number> = {
  FMD: 12,
  HS: 6,
  BQ: 6,
  Anthrax: 12,
};

const AddVaccine = () => {
  const pathname = usePathname();

  const [selectedGroup, setSelectedGroup] = useState<GroupType>('bachur');
  const [vaccineName, setVaccineName] = useState('FMD');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [history, setHistory] = useState<Vaccine[]>([]);

  const formatDate = (date: Date) => date.toLocaleDateString('bn-BD');

  // 📦 Load
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('vaccine_history');
      if (data) setHistory(JSON.parse(data));
    })();
  }, []);

  // 💾 Save
  useEffect(() => {
    AsyncStorage.setItem('vaccine_history', JSON.stringify(history));
  }, [history]);

  const getNextDate = (date: Date, vaccine: string) => {
    const months = vaccineSchedule[vaccine] || 6;
    const next = new Date(date);
    next.setMonth(next.getMonth() + months);
    return next;
  };

  const getStatus = (nextDate: Date): VaccineStatus => {
    const today = new Date();

    if (nextDate < today) return 'due';

    const diff = (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diff <= 7) return 'upcoming';

    return 'completed';
  };

  const onChangeDate = (_: any, date?: Date) => {
    setShowPicker(false);
    if (date) setSelectedDate(date);
  };

  const handleAdd = () => {
    const next = getNextDate(selectedDate, vaccineName);

    const newData: Vaccine = {
      id: Date.now(),
      name: vaccineName,
      date: formatDate(selectedDate),
      nextDate: formatDate(next),
      status: getStatus(next),
    };

    setHistory(prev => [newData, ...prev]);
  };

  const getStatusStyle = (status: VaccineStatus) => {
    if (status === 'completed') return { color: 'green', text: 'সম্পন্ন' };
    if (status === 'upcoming') return { color: 'orange', text: 'আসছে' };
    return { color: 'red', text: 'বাকি' };
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.headerTitle}>ভ্যাকসিন ব্যবস্থাপনা</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Tabs */}
        <View style={styles.tabs}>
          {groups.map(group => (
            <TouchableOpacity
              key={group.key}
              style={[
                styles.tab,
                selectedGroup === group.key && styles.activeTab,
              ]}
              onPress={() => setSelectedGroup(group.key as GroupType)}
            >
              <Text
                style={
                  selectedGroup === group.key
                    ? styles.activeText
                    : styles.tabText
                }
              >
                {group.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Form */}
        <View style={styles.card}>
          <Text style={styles.title}>নতুন ভ্যাকসিন যোগ করুন</Text>

          <Text style={styles.label}>ভ্যাকসিন নির্বাচন করুন</Text>

          <View style={styles.pickerBox}>
            <Picker selectedValue={vaccineName} onValueChange={setVaccineName}>
              {vaccineList.map(v => (
                <Picker.Item key={v} label={v} value={v} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>দেওয়ার তারিখ</Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowPicker(true)}
          >
            <Text>{formatDate(selectedDate)}</Text>
            <Ionicons name="calendar-outline" size={20} />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              onChange={onChangeDate}
            />
          )}

          <View style={styles.nextBox}>
            <Text>
              📅 পরবর্তী ভ্যাকসিন:{' '}
              {formatDate(getNextDate(selectedDate, vaccineName))}
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>সংরক্ষণ করুন</Text>
          </TouchableOpacity>
        </View>

        {/* History */}
        <View style={styles.card}>
          <Text style={styles.title}>ভ্যাকসিন ইতিহাস</Text>

          {history.map(item => {
            const status = getStatusStyle(item.status);

            return (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.circle}>
                  <Text style={styles.circleText}>{item.name}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.vaccineName}>{item.name} সম্পন্ন</Text>
                  <Text>দেওয়া: {item.date}</Text>
                  <Text>পরবর্তী: {item.nextDate}</Text>
                </View>

                <View style={styles.statusBadge}>
                  <View
                    style={[styles.dot, { backgroundColor: status.color }]}
                  />
                  <Text>{status.text}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <FooterNavigation/>
    </View>
  );
};

export default AddVaccine;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    backgroundColor: '#2e7d32',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 10,
  },

  tab: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#e5e7eb',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#2e7d32',
    elevation: 3,
  },

  tabText: { color: '#333', fontSize: 15 },

  activeText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },

  card: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 15,
    borderRadius: 12,
  },

  title: { fontWeight: 'bold', marginBottom: 10 },

  label: { marginTop: 10 },

  pickerBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
  },

  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },

  nextBox: {
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  button: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },

  buttonText: { color: '#fff', fontWeight: 'bold' },

  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
  },

  circle: {
    minWidth: 40,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  circleText: { color: '#fff', fontSize: 12 },

  vaccineName: { fontWeight: 'bold' },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
});
