import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Action {
  icon: any;
  label: string;
  color: string;
  route: `/farmerDashboard/actions/${string}`; // ✅ Type-safe route
}

const QuickActions: React.FC = () => {
  const router = useRouter();

  const actions: Action[] = [
    {
      icon: 'leaf',
      label: 'খাবার যোগ\nকরুন',
      color: '#22c55e',
      route: '/farmerDashboard/actions/addFood',
    },
    {
      icon: 'medkit',
      label: 'ওষুধ যোগ\nকরুন',
      color: '#ef4444',
      route: '/farmerDashboard/actions/addMedicine',
    },
    {
      icon: 'medical',
      label: 'ভ্যাকসিন\nযোগ করুন',
      color: '#3b82f6',
      route: '/farmerDashboard/actions/addVaccine',
    },
    {
      icon: 'add',
      label: 'নতুন গরু\nযোগ করুন',
      color: '#a855f7',
      route: '/farmerDashboard/actions/addCow',
    },
    {
      icon: 'cart',
      label: 'গরু বিক্রি\nকরুন',
      color: '#f97316',
      route: '/farmerDashboard/actions/sellCow',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>দ্রুত কাজ</Text>

      <View style={styles.cardBox}>
        <View style={styles.grid}>
          {actions.map((a, i) => (
            <TouchableOpacity
              key={i}
              style={styles.item}
              onPress={() => router.push(a.route as any)} // ✅ এখন type-safe
            >
              <View style={[styles.circle, { backgroundColor: a.color }]}>
                <Ionicons name={a.icon} size={24} color="#fff" />
              </View>

              <Text style={styles.text}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  cardBox: {
    backgroundColor: 'white',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 10,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  item: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 22,
  },

  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    lineHeight: 16,
  },
});
