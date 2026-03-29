import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useSegments } from 'expo-router'; // ✅ add

interface Item {
  icon: any;
  label: string;
  active?: boolean;
  route?: string; // ✅ add
}

const FooterNavigation: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // ✅ add
  const segments = useSegments();
  const currentSegment = segments[segments.length - 1] ?? '';

  const items: Item[] = [
    { icon: 'storefront-outline', label: 'মার্কেটপ্লেস', route: './marketplace' },
    { icon: 'chatbubble-outline', label: 'চ্যাট', route: './chat-list' },
    { icon: 'cart', label: 'আমার অর্ডার', route: './myorders' },
    { icon: 'notifications-outline', label: 'নোটিফিকেশন', route: './notifications' },
    { icon: 'person', label: 'প্রোফাইল', route: './profile' },
  ];

  const getSegmentFromRoute = (route?: string) => {
    if (!route) return '';
    return route.replace(/^\.\//, '').replace(/^\//, '').split('/').pop() || '';
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.topBorder} />

      <View style={styles.footer}>
        {items.map((item, i) => {
          const itemSegment = getSegmentFromRoute(item.route);
          const isActive = itemSegment === currentSegment;

          return (
            <TouchableOpacity
              key={i}
              style={styles.item}
              onPress={() => {
                if (item.route) {
                  router.push(item.route as any); // ✅ navigation
                }
              }}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={isActive ? '#1c8f4a' : '#777'}
              />
              <Text style={[styles.text, { color: isActive ? '#1c8f4a' : '#777' }]}> 
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FooterNavigation;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },

  topBorder: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  text: {
    fontSize: 11,
    marginTop: 3,
  },
});
