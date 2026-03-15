import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from 'expo-router';

import type { NavigationProp } from "@react-navigation/native";

export default function ChatPage({ navigation }: { navigation: NavigationProp<any> }) {
  const router = useRouter();

  const conversations = [
    {
      id: 1,
      name: "করিম খামার",
      lastMessage: "গরুটি কি এখনও বিক্রয়ের জন্য আছে?",
      time: "২ মিনিট আগে",
      unread: 2,
      online: true,
      avatar: "ক",
    },
    {
      id: 2,
      name: "রহমান খামার",
      lastMessage: "ধন্যবাদ, আমি আগ্রহী",
      time: "১৫ মিনিট আগে",
      unread: 0,
      online: false,
      avatar: "র",
    },
    {
      id: 3,
      name: "সালাম খামার",
      lastMessage: "গরুটি কবে দেখতে পারব?",
      time: "১ ঘন্টা আগে",
      unread: 1,
      online: true,
      avatar: "স",
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}

        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>চ্যাট</Text>
        </View>

        <View style={styles.main}>

        {/* Conversation List */}

            <View style={styles.container}>
                <TextInput
                    placeholder="চ্যাট খুঁজুন..."
                    style={styles.search}
                />

                <ScrollView>
                    {conversations.map((conv) => (
                        <TouchableOpacity
                            key={conv.id}
                            style={styles.conversation}
                            onPress={() => router.push(`/chat?id=${conv.id}`)}
                        >

                            <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{conv.avatar}</Text>

                            {conv.online && <View style={styles.onlineDot} />}
                            </View>

                            <View style={{ flex: 1 }}>
                            <View style={styles.row}>
                                <Text style={styles.name}>{conv.name}</Text>
                                <Text style={styles.time}>{conv.time}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.lastMessage}>
                                {conv.lastMessage}
                                </Text>

                                {conv.unread > 0 && (
                                <View style={styles.unread}>
                                    <Text style={styles.unreadText}>
                                    {conv.unread}
                                    </Text>
                                </View>
                                )}
                            </View>
                            </View>

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    </View>
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
alignItems:"center",
padding:15,
backgroundColor:"#fff"
},

headerTitle:{
fontSize:18,
fontWeight:"bold",
marginLeft:10
},

main:{
flex:1,
flexDirection:"row"
},

sidebar:{
backgroundColor:"#fff",
borderRightWidth:1,
borderColor:"#eee"
},

search:{
margin:10,
padding:8,
borderWidth:1,
borderColor:"#ddd",
borderRadius:8
},

conversation:{
flexDirection:"row",
padding:10,
gap:10
},

activeChat:{
backgroundColor:"#e6f5ea"
},

avatar:{
width:40,
height:40,
borderRadius:20,
backgroundColor:"#2f855a",
alignItems:"center",
justifyContent:"center"
},

avatarText:{
color:"white",
fontWeight:"bold"
},

onlineDot:{
position:"absolute",
bottom:0,
right:0,
width:10,
height:10,
backgroundColor:"green",
borderRadius:5
},

row:{
flexDirection:"row",
justifyContent:"space-between"
},

name:{
fontWeight:"bold"
},

time:{
fontSize:12,
color:"gray"
},

lastMessage:{
fontSize:13,
color:"gray",
flex:1
},

unread:{
backgroundColor:"green",
borderRadius:10,
paddingHorizontal:6
},

unreadText:{
color:"white",
fontSize:12
},

chatArea:{
flex:1
},

chatHeader:{
flexDirection:"row",
justifyContent:"space-between",
padding:15,
borderBottomWidth:1,
borderColor:"#eee",
backgroundColor:"#fff"
},

messages:{
flex:1,
padding:10
},

messageRow:{
flexDirection:"row",
marginBottom:10
},

messageBubble:{
maxWidth:"70%",
padding:10,
borderRadius:12
},

myMessage:{
backgroundColor:"#16a34a"
},

otherMessage:{
backgroundColor:"#fff",
borderWidth:1,
borderColor:"#ddd"
},

timeSmall:{
fontSize:10,
marginTop:5,
opacity:0.7
},

inputArea:{
flexDirection:"row",
alignItems:"center",
padding:10,
borderTopWidth:1,
borderColor:"#eee",
backgroundColor:"#fff"
},

input:{
flex:1,
marginHorizontal:10,
padding:8,
borderWidth:1,
borderColor:"#ddd",
borderRadius:20
},

sendBtn:{
backgroundColor:"#16a34a",
padding:10,
borderRadius:20
}

});