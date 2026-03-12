import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary";
}

export default function Button({ title, onPress, type = "primary" }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "secondary" && styles.secondaryButton
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          type === "secondary" && styles.secondaryText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0a8f3c",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#0a8f3c",
  },

  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryText: {
    color: "#0a8f3c",
  },
});