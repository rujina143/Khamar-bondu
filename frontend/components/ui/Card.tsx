import React, { ReactNode } from "react";
import { StyleSheet, Text, View, ViewStyle, TouchableOpacity } from "react-native";

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: CardProps) {
  return <TouchableOpacity style={[styles.card, style]}>{children}</TouchableOpacity>;
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function CardDescription({ children }: { children: ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },

  header: {
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    fontSize: 14,
    color: "#666",
  },

  content: {
    marginTop: 10,
  },

  footer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
