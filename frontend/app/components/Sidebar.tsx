import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Sidebar() {
  const router = useRouter();

  return (
    <View style={styles.sidebar}>
      {/* Header */}
      <Text style={styles.header}>খামার বন্ধু</Text>
      <Text style={styles.subHeader}>ক্রেতা প্যানেল</Text>

      {/* Menu Items */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/shop')}
      >
        <Ionicons name="storefront-outline" size={22} color="#fff" />
        <Text style={styles.text}>মার্কেটপ্লেস</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/wishlist')}
      >
        <Ionicons name="heart-outline" size={22} color="#fff" />
        <Text style={styles.text}>প্রিয় তালিকা</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/orders')}
      >
        <Ionicons name="cart-outline" size={22} color="#fff" />
        <Text style={styles.text}>আমার অর্ডার</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/chat')}
      >
        <Ionicons name="chatbubble-outline" size={22} color="#fff" />
        <Text style={styles.text}>চ্যাট</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/notifications')}
      >
        <Ionicons name="notifications-outline" size={22} color="#fff" />
        <Text style={styles.text}>নোটিফিকেশন</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/settings')}
      >
        <Ionicons name="settings-outline" size={22} color="#fff" />
        <Text style={styles.text}>সেটিংস</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/logout')}
      >
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={[styles.text, { color: 'red' }]}>লগআউট</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});
