import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from 'expo-router';


export default function CattleDetails({ navigation }: { navigation: any }) {
  const router = useRouter();
    
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  const cattleData = {
    name: "গরু #১২৩",
    breed: "শাহীওয়াল",
    age: "২ বছর",
    weight: "৪৫০ কেজি",
    gender: "পুরুষ",
    health: "সুস্থ",
    location: "ময়মনসিংহ, বাংলাদেশ",
    salePrice: 85000,
    healthScore: 95,
    description:
      "চমৎকার স্বাস্থ্যবান শাহীওয়াল জাতের গরু। নিয়মিত টিকা ও চিকিৎসা দেওয়া হয়েছে।",
  };

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{cattleData.name}</Text>

        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>

        {/* Image Section */}

        <View style={styles.imageContainer}>
          <Text style={styles.cowEmoji}>🐄</Text>
        </View>

        {/* Basic Info */}

        <View style={styles.card}>
          <Text style={styles.title}>{cattleData.name}</Text>

          <Text style={styles.badge}>{cattleData.breed}</Text>

          <Text style={styles.location}>
            📍 {cattleData.location}
          </Text>

          <Text style={styles.price}>
            ৳{cattleData.salePrice}
          </Text>

          <View style={styles.infoGrid}>
            <Info label="বয়স" value={cattleData.age} />
            <Info label="ওজন" value={cattleData.weight} />
            <Info label="লিঙ্গ" value={cattleData.gender} />
            <Info label="স্বাস্থ্য" value={cattleData.health} />
          </View>

          <Text style={styles.description}>
            {cattleData.description}
          </Text>
        </View>

        {/* Tabs */}

        <View style={styles.tabs}>
          <TabButton
            title="সংক্ষিপ্ত"
            active={activeTab === "overview"}
            onPress={() => setActiveTab("overview")}
          />

          <TabButton
            title="স্বাস্থ্য"
            active={activeTab === "health"}
            onPress={() => setActiveTab("health")}
          />
        </View>

        {/* Tab Content */}

        {activeTab === "overview" && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>ক্রয় তথ্য</Text>

            <Text>ক্রয়ের তারিখ: ১৫ জানুয়ারি ২০২৪</Text>
            <Text>বিক্রেতা: করিম খামার</Text>
          </View>
        )}

        {activeTab === "health" && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>স্বাস্থ্য স্কোর</Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${cattleData.healthScore}%` },
                ]}
              />
            </View>

            <Text>{cattleData.healthScore}%</Text>
          </View>
        )}

      </ScrollView>

      {/* Bottom Action */}

      <View style={styles.bottomBar}>
        <TouchableOpacity 
        style={styles.chatBtn}
        onPress={()=>{router.push('./chat-list')}}
        >
          <Text >চ্যাট</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyBtn} 
        onPress={()=>{router.push('./order')}}
        >
          <Text style={styles.btnText}>অর্ডার করুন</Text>
        </TouchableOpacity>
        
      </View>

    </View>
  );
}

type InfoProps = {
  label: string;
  value: string;
};

function Info({ label, value }: InfoProps) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

type TabButtonProps = {
  title: string;
  active: boolean;
  onPress: () => void;
};

function TabButton({ title, active, onPress }: TabButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.tabBtn, active && styles.activeTab]}
      onPress={onPress}
    >
      <Text style={active ? styles.activeTabText : styles.tabText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5"
},

header:{
height: 100,
paddingTop:40,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
padding:15,
backgroundColor:"#fff"
},

headerTitle:{
fontSize:18,
fontWeight:"bold"
},

imageContainer:{
alignItems:"center",
padding:20
},

cowEmoji:{
fontSize:100
},

card:{
backgroundColor:"#fff",
padding:15,
margin:10,
borderRadius:10
},

title:{
fontSize:20,
fontWeight:"bold"
},

badge:{
backgroundColor:"#e5f7e5",
alignSelf:"flex-start",
padding:5,
marginTop:5
},

location:{
marginTop:5,
color:"gray"
},

price:{
fontSize:24,
color:"green",
marginTop:10
},

infoGrid:{
flexDirection:"row",
flexWrap:"wrap",
marginTop:10
},

infoBox:{
width:"50%",
marginTop:10
},

infoLabel:{
color:"gray"
},

infoValue:{
fontSize:16
},

description:{
marginTop:10
},

tabs:{
flexDirection:"row",
justifyContent:"space-around",
marginTop:10
},

tabBtn:{
padding:10
},

activeTab:{
borderBottomWidth:2,
borderColor:"green"
},

tabText:{
color:"gray"
},

activeTabText:{
color:"green",
fontWeight:"bold"
},

sectionTitle:{
fontSize:18,
marginBottom:10
},

progressBar:{
height:10,
backgroundColor:"#eee",
borderRadius:5
},

progressFill:{
height:10,
backgroundColor:"green",
borderRadius:5
},

bottomBar:{
flexDirection:"row",
justifyContent:"space-evenly",
padding:10,
paddingBottom:30,
backgroundColor:"#fff"
},

chatBtn:{
flex:1,
backgroundColor:"#ddd",
padding:15,
marginRight:5,
alignItems:"center",
borderRadius:8,
borderWidth:1,
},

buyBtn:{
flex:1,
backgroundColor:"green",
padding:15,
marginLeft:5,
alignItems:"center",
borderRadius:8
},

btnText:{
color:"#fff",
fontWeight:"bold"
}

});