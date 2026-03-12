import Button from "@/components/ui/button";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DashboardHeader from "../components/ui/DashboardHeader";

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [userData, setUserData] = useState(null as any);

  const onLogout = () => {
    router.replace("/welcome");
  };

  const featuredCattle = [
    {
      id: 1,
      name: "সুন্দর শাহীওয়াল",
      breed: "শাহীওয়াল",
      age: "২.৫ বছর",
      weight: "৪৫০ কেজি",
      health: "চমৎকার",
      location: "ময়মনসিংহ",
      price: 85000,
      seller: "আব্দুল করিম",
    },
    {
      id: 2,
      name: "ফ্রিজিয়ান গাভী",
      breed: "ফ্রিজিয়ান",
      age: "৩ বছর",
      weight: "৫২০ কেজি",
      health: "চমৎকার",
      location: "ঢাকা",
      price: 120000,
      seller: "রহিম উদ্দিন",
    },
  ];

  const categories = ["সব", "শাহীওয়াল", "ফ্রিজিয়ান", "দেশি", "সিন্ধি"];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <DashboardHeader
        userName={"ক্রেতা"}
        onMenuPress={() => console.log("Menu pressed")}
        onNotificationsPress={() => console.log("Notifications pressed")}
      />
      <ScrollView style={styles.container}>
        {/* Welcome */}
        <View style={styles.welcome}>
          <Text style={styles.title}>
            স্বাগতম, {userData?.name || "ক্রেতা"}!
          </Text>
          <Text style={styles.subtitle}>আপনার পছন্দের গরু খুঁজে নিন</Text>
        </View>

        {/* Search */}
        <View style={styles.searchCard}>
          <TextInput
            placeholder="গরু খুঁজুন..."
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>ফিল্টার</Text> 
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat} style={styles.category}>
              <Text>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured cattle */}
        <Text style={styles.sectionTitle}>বিশেষ নির্বাচিত গরু</Text>

        {featuredCattle.map((cattle) => (
          <TouchableOpacity
            key={cattle.id}
            style={styles.card}
            onPress={() => router.push("/cattle-details")}
          >
            <Text style={styles.cow}>🐄</Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.cattleName}>{cattle.name}</Text>

              <Text style={styles.info}>
                {cattle.breed} • 
              </Text>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.info}>বয়স:{cattle.age}</Text>
                <Text style={styles.info}>ওজন: {cattle.weight}</Text>
              </View>

              <View style={{flexDirection: "row"}}>
                <Text style={styles.info}>স্বাস্থ্য: {cattle.health}</Text>
                <Text style={styles.info}>স্থান: {cattle.location}</Text>
              </View>

              <View style={{flexDirection: "row", marginTop:10}}>
                <View>
                  <Text style={styles.price}>৳{cattle.price.toLocaleString()}</Text>
                  <Text style={styles.seller}>খামারি: {cattle.seller}</Text>
                </View>

                <View style={{flexDirection: "row", paddingTop:5, marginLeft:20}}>
                  <Ionicons name="chatbubble-outline" size={32} color="#0a5c2b" style={{marginRight:10}}/>
                  
                  <TouchableOpacity style={styles.filterBtn}>
                    <Text style={styles.filterText}> বিস্তারিত </Text> 
                  </TouchableOpacity>
                </View>
              </View>
              
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  logo: {
    fontSize: 22,
    fontWeight: "bold",
  },

  logout: {
    color: "red",
  },

  welcome: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
  },

  searchCard: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "white",
  },

  category: {
    padding: 10,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },

  cow: {
    fontSize: 40,
    marginRight: 12,
  },

  cattleName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    color: "#555",
    marginRight: 50,
  },

  filterBtn: {
    backgroundColor: "green", 
    paddingHorizontal: 16, 
    justifyContent: "center", 
    borderRadius: 8, 
  }, 

  filterText: { 
    color: "white", 
  },

  price: {
    fontSize: 20,
    color: "green",
    marginTop: 5,
  },

  seller: {
    fontSize: 12,
    color: "#777",
  },
});
