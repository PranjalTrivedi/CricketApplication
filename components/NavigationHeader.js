import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NavigationHeader = ({ navigation }) => {
  return (
    <>
      <StatusBar backgroundColor="#007AFF" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CricketApp</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === "ios" ? 60 : 50,
    paddingTop: Platform.OS === "ios" ? 0 : 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
  },
  menuButton: {
    paddingVertical: 10,
  },
  rightIcons: {
    flexDirection: "row",
    gap: 15,
    marginLeft: "auto",
  },
  iconButton: {
    paddingVertical: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default NavigationHeader;
