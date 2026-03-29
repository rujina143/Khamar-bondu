import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FooterNavigation = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { icon: 'home' as const, label: 'হোম', route: '/farmerDashboard' },
    { icon: 'paw' as const, label: 'গরু', route: '/farmerDashboard/actions/addCow' },
    {
      icon: 'leaf' as const,
      label: 'খাবার',
      route: '/farmerDashboard/actions/addFood',
    },
    {
      icon: 'medkit' as const,
      label: 'স্বাস্থ্য',
      route: '/farmerDashboard/actions/addMedicine',
    },
    {
      icon: 'cart' as const,
      label: 'মার্কেট',
      route: '/farmerDashboard/actions/sellCow',
    },
    { icon: 'person' as const, label: 'প্রোফাইল', route: '/profile' },
  ];
      
  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.topBorder} />

      <View style={styles.footer}>
        {items.map((item, i) => {
          const isActive = pathname === item.route;

          return (
            <TouchableOpacity
              key={i}
              style={styles.item}
              onPress={() => router.push(item.route as any)}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={isActive ? "#1c8f4a" : "#777"}
              />
              <Text
                style={[styles.text, { color: isActive ? "#1c8f4a" : "#777" }]}
              >
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
  },

  topBorder: {
    height: 1,
    backgroundColor: "#e5e7eb",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  text: {
    fontSize: 11,
    marginTop: 3,
  },
});
