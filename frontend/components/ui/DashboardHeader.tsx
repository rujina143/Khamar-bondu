import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Avatar } from './Avatar';

// Dashboard Header
interface DashboardHeaderProps {
  userName: string;
  onMenuPress: () => void;
  onNotificationsPress: () => void;
}

export default function DashboardHeader({
  userName,
  onMenuPress,
  onNotificationsPress,
}: DashboardHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>খামার বন্ধু</Text>
      
      {/* Right: Notification + Menu */}
      <View style={styles.right}>
        <TouchableOpacity onPress={onNotificationsPress} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={26} color="#0a5c2b" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <MaterialIcons name="menu" size={28} color="#0a5c2b" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingTop:32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginBottom:5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    paddingTop:6,
    fontWeight: 'bold',
    color: '#0a5c2b',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});