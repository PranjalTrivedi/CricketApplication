import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={22} color="#007AFF" />
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Search")}
      >
        <FontAwesome name="search" size={22} color="#888" />
        <Text style={styles.footerButtonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Matches")}
      >
        <MaterialCommunityIcons name="cricket" size={22} color="#888" />
        <Text style={styles.footerButtonText}>Matches</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Community")}
      >
        <Ionicons name="people" size={22} color="#888" />
        <Text style={styles.footerButtonText}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Feather name="user" size={22} color="#888" />
        <Text style={styles.footerButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5, // Reduced from 10 to 5
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 50, // Reduced from 60 to 50
  },
  footerButtonText: {
    fontSize: 12,
    marginTop: 4,
    color: "#888",
    textAlign: "center",
    includeFontPadding: false,
  },
});

export default Footer;
