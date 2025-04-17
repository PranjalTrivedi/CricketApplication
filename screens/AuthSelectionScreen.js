import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const AuthSelectionScreen = () => {
  const [country, setCountry] = useState("IN");
  const navigation = useNavigation();

  const countries = [
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Country</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
          style={styles.picker}
        >
          {countries.map((c) => (
            <Picker.Item
              key={c.code}
              label={`${c.flag} ${c.name}`}
              value={c.code}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.authOptions}>
        <TouchableOpacity
          style={[styles.authButton, styles.whatsapp]}
          onPress={() => navigation.navigate("Login", { method: "whatsapp" })}
        >
          <Text style={styles.authButtonText}>Continue with WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.authButton, styles.mobile]}
          onPress={() => navigation.navigate("Login", { method: "mobile" })}
        >
          <Text style={styles.authButtonText}>Continue with Mobile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.authButton, styles.email]}
          onPress={() => navigation.navigate("Login", { method: "email" })}
        >
          <Text style={styles.authButtonText}>Continue with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.authButton, styles.google]}
          onPress={() => navigation.navigate("Login", { method: "google" })}
        >
          <Text style={styles.authButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.authButton, styles.facebook]}
          onPress={() => navigation.navigate("Login", { method: "facebook" })}
        >
          <Text style={styles.authButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 30,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },
  authOptions: {
    width: "100%",
  },
  authButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  authButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  whatsapp: { backgroundColor: "#25D366" },
  mobile: { backgroundColor: "#007AFF" },
  email: { backgroundColor: "#FF9500" },
  google: { backgroundColor: "#DB4437" },
  facebook: { backgroundColor: "#4267B2" },
});

export default AuthSelectionScreen;
