import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from 'expo-router';
import type { NavigationProp } from "@react-navigation/native";

export default function ChatPage({ navigation }: { navigation: NavigationProp<any> }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  
  const messages = [
    { id: 1, sender: "other", text: "আসসালামু আলাইকুম। গরু সম্পর্কে জানতে চাই।", time: "10:30" },
    { id: 2, sender: "me", text: "ওয়ালাইকুম আসসালাম। অবশ্যই।", time: "10:32" },
    { id: 3, sender: "other", text: "গরুর বয়স কত?", time: "10:33" },
    { id: 4, sender: "me", text: "২ বছর। স্বাস্থ্য ভালো।", time: "10:34" },
  ];

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessage("");
  };
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {

  const showSub = Keyboard.addListener(
    "keyboardDidShow",
    (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    }
  );

  const hideSub = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      setKeyboardHeight(0);
    }
  );

  return () => {
    showSub.remove();
    hideSub.remove();
  };

}, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} /> 
      {/* Chat Header */}

      <View style={styles.chatHeader}>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.name}>{"korim khamari"}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 15 }}>
          <Ionicons name="call-outline" size={22} />
          <Ionicons name="videocam-outline" size={22} />
        </View>
      </View>

      {/* Messages */}

      <ScrollView style={styles.messages}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.sender === "me"
                ? { justifyContent: "flex-end" }
                : { justifyContent: "flex-start" }
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.sender === "me"
                  ? styles.myMessage
                  : styles.otherMessage
              ]}
            >
              <Text
                style={
                  msg.sender === "me"
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                {msg.text}
              </Text>

              <Text style={styles.timeSmall}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}

      <View
        style={[
          styles.inputArea,
          { marginBottom: keyboardHeight }
        ]}
      >
        <TouchableOpacity>
          <Ionicons name="attach" size={24} />
        </TouchableOpacity>

        <TextInput
          placeholder="মেসেজ লিখুন..."
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendMessage}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
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
    paddingTop:32,
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
width:260,
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
fontWeight:"bold",
paddingLeft:8,
paddingTop:4,
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
height: 100,
paddingTop:40,
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
paddingBottom:30,
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