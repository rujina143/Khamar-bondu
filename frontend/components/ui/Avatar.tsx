import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AvatarProps {
  size?: number;
  children: React.ReactNode;
}

export function Avatar({ size = 40, children }: AvatarProps) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size / 2 }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#0a5c2b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});