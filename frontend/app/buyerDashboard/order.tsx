import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function OrderPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cash");

  // 🔥 Negotiation state
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");

  const cow = {
    name: "গরু #১২৩",
    price: 85000,
    location: "ময়মনসিংহ"
  };

  const deliveryCharge = 2000;

  // 🔥 Final price logic
  const finalPrice = offerPrice ? Number(offerPrice) : cow.price;
  const total = finalPrice + deliveryCharge;

  const placeOrder = () => {
    if (!name || !phone || !address) {
      Alert.alert("Error", "সব তথ্য পূরণ করুন");
      return;
    }

    if (isNegotiable && offerPrice) {
      Alert.alert("Offer Sent", `আপনার অফার ৳${offerPrice} পাঠানো হয়েছে`);
    } else {
      Alert.alert("Success", "অর্ডার সম্পন্ন হয়েছে!");
    }

    router.back();
  };

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>অর্ডার করুন</Text>
      </View>

      {/* Cow Info */}
      <View style={styles.card}>
        <Text style={styles.title}>{cow.name}</Text>
        <Text>লোকেশন: {cow.location}</Text>
        <Text style={styles.price}>৳ {cow.price}</Text>
      </View>

      {/* 🔥 Negotiation Section */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>দাম নিয়ে আলোচনা</Text>
          <Switch
            value={isNegotiable}
            onValueChange={setIsNegotiable}
          />
        </View>

        {isNegotiable && (
          <>
            <TextInput
              placeholder="আপনার অফার লিখুন (৳)"
              keyboardType="numeric"
              value={offerPrice}
              onChangeText={setOfferPrice}
              style={styles.input}
            />

            <Text style={{ color: "gray", fontSize: 12 }}>
              আপনি আপনার ইচ্ছামতো দাম প্রস্তাব করতে পারেন
            </Text>
          </>
        )}
      </View>

      {/* Buyer Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>আপনার তথ্য</Text>

        <TextInput
          placeholder="নাম"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="ফোন নম্বর"
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          placeholder="ঠিকানা"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Payment Method */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>পেমেন্ট পদ্ধতি</Text>

        {["cash", "bkash", "nagad"].map((method) => (
          <TouchableOpacity
            key={method}
            style={styles.paymentItem}
            onPress={() => setPayment(method)}
          >
            <Ionicons
              name={
                payment === method
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
            />

            <Text style={styles.paymentText}>
              {method === "cash" && "ক্যাশ অন ডেলিভারি"}
              {method === "bkash" && "bKash"}
              {method === "nagad" && "Nagad"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Price Summary */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>মূল্য হিসাব</Text>

        <View style={styles.row}>
          <Text>মূল দাম</Text>
          <Text>৳ {cow.price}</Text>
        </View>

        {offerPrice && (
          <View style={styles.row}>
            <Text>আপনার অফার</Text>
            <Text style={{ color: "orange" }}>৳ {offerPrice}</Text>
          </View>
        )}

        <View style={styles.row}>
          <Text>ডেলিভারি চার্জ</Text>
          <Text>৳ {deliveryCharge}</Text>
        </View>

        <View style={styles.row}>
          <Text style={{ fontWeight: "bold" }}>মোট</Text>
          <Text style={{ fontWeight: "bold" }}>৳ {total}</Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.orderBtn} onPress={placeOrder}>
        <Text style={styles.orderText}>
          {isNegotiable && offerPrice
            ? "অফার পাঠান"
            : "অর্ডার কনফার্ম করুন"}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5"
},

header:{
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

card:{
backgroundColor:"#fff",
margin:10,
padding:15,
borderRadius:10
},

title:{
fontSize:18,
fontWeight:"bold"
},

price:{
fontSize:20,
color:"green",
marginTop:5
},

sectionTitle:{
fontSize:16,
fontWeight:"bold",
marginBottom:10
},

input:{
borderWidth:1,
borderColor:"#ddd",
borderRadius:8,
padding:10,
marginBottom:10
},

paymentItem:{
flexDirection:"row",
alignItems:"center",
marginBottom:10
},

paymentText:{
marginLeft:10
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:5,
alignItems:"center"
},

orderBtn:{
backgroundColor:"#16a34a",
margin:15,
padding:15,
borderRadius:10,
alignItems:"center"
},

orderText:{
color:"#fff",
fontWeight:"bold"
}

});