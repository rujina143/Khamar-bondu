import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function Filter() {
  const router = useRouter();

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const [weightMin, setWeightMin] = useState('');
  const [weightMax, setWeightMax] = useState('');

  const [location, setLocation] = useState('');

  const [age, setAge] = useState<string[]>([]);
  const [health, setHealth] = useState<string[]>([]);

  const ageOptions = [
    "6m-1y",
    "1-2y",
    "2-3y",
    "3-5y"
  ];

  const healthOptions = [
    "চমৎকার",
    "ভালো",
    "এভারেজ"
  ];

  const districts = [
    "ঢাকা",
    "রাজশাহী",
    "খুলনা",
    "চট্টগ্রাম",
    "সিলেট",
    "বরিশাল",
    "রংপুর",
    "ময়মনসিংহ"
  ];

  const toggleSelect = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const applyFilter = () => {
    const filters = {
      priceMin,
      priceMax,
      weightMin,
      weightMax,
      location,
      age,
      health
    };

    console.log(filters);
    router.replace('./marketplace'); 
  };

  const resetFilter = () => {
    setPriceMin('');
    setPriceMax('');
    setWeightMin('');
    setWeightMax('');
    setLocation('');
    setAge([]);
    setHealth([]);
  };

  return (
    <ScrollView style={styles.sidebar}>

      <Text style={styles.header}>ফিল্টার করুন</Text>
      <Text style={styles.subHeader}>সেরা গরু খুঁজুন</Text>

      {/* Price Range */}
      <Text style={styles.sectionTitle}>মূল্য পরিসীমা</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="সর্বনিম্ন"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={priceMin}
          onChangeText={setPriceMin}
        />

        <TextInput
          style={styles.input}
          placeholder="সর্বোচ্চ"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={priceMax}
          onChangeText={setPriceMax}
        />
      </View>

      {/* Weight Range */}
      <Text style={styles.sectionTitle}>ওজন (কেজি)</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="সর্বনিম্ন"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={weightMin}
          onChangeText={setWeightMin}
        />

        <TextInput
          style={styles.input}
          placeholder="সর্বোচ্চ"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={weightMax}
          onChangeText={setWeightMax}
        />
      </View>

      {/* Age */}
      <Text style={styles.sectionTitle}>বয়স</Text>

      {ageOptions.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxItem}
          onPress={() => toggleSelect(item, age, setAge)}
        >
          <Ionicons
            name={age.includes(item) ? "checkbox" : "square-outline"}
            size={20}
            color="#fff"
          />
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      ))}

      {/* Location */}
      <Text style={styles.sectionTitle}>অবস্থান</Text>

      <View style={styles.dropdown}>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="বিভাগ নির্বাচন করুন" value="" />

          {districts.map((district) => (
            <Picker.Item key={district} label={district} value={district} />
          ))}

        </Picker>
      </View>


      {/* Health */}
      <Text style={styles.sectionTitle}>স্বাস্থ্যের অবস্থা</Text>

      {healthOptions.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxItem}
          onPress={() => toggleSelect(item, health, setHealth)}
        >
          <Ionicons
            name={health.includes(item) ? "checkbox" : "square-outline"}
            size={20}
            color="#fff"
          />
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      ))}

      {/* Buttons */}
      <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
        <Text style={styles.btnText}>ফিল্টার প্রয়োগ করুন</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={resetFilter}>
        <Text style={styles.btnText}>রিসেট করুন</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#0a5c2b',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  subHeader: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 25,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 15,
    fontWeight: '600'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    width: '48%'
  },

  inputFull: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    width: '100%'
  },

  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 15,
  },

  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 6
  },

  applyBtn: {
    backgroundColor: '#ffcc00',
    padding: 12,
    borderRadius: 8,
    marginTop: 25,
    alignItems: 'center'
  },

  resetBtn: {
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },

  btnText: {
    fontWeight: 'bold'
  }
});