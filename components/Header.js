import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "forYou" && styles.activeTab]}
        onPress={() => setActiveTab("forYou")}
      >
        <Text style={styles.tabText}>For You</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "club" && styles.activeTab]}
        onPress={() => setActiveTab("club")}
      >
        <Text style={styles.tabText}>Club</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Header;
