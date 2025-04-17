import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

const LiveMatchesScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const matchesRef = collection(db, "matches");
    const unsubscribe = onSnapshot(
      matchesRef,
      (querySnapshot) => {
        const matchesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatches(matchesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to matches: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteMatch = async (matchId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this match?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "matches", matchId));
              Alert.alert("Success", "Match deleted successfully");
              setSearchTerm("");
            } catch (error) {
              Alert.alert("Error", "Failed to delete match");
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  const filteredMatches = matches.filter(
    (match) =>
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>🏏 Live Matches</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.matchCard}
            onPress={() =>
              navigation.navigate("MatchDetails", { matchId: item.id })
            }
          >
            <View style={styles.teamsContainer}>
              <View style={styles.team}>
                <Image
                  source={{ uri: item.team1Logo }}
                  style={styles.teamLogo}
                />
                <Text style={styles.teamName}>{item.team1}</Text>
              </View>
              <Text style={styles.vsText}>vs</Text>
              <View style={styles.team}>
                <Image
                  source={{ uri: item.team2Logo }}
                  style={styles.teamLogo}
                />
                <Text style={styles.teamName}>{item.team2}</Text>
              </View>
            </View>
            <Text style={styles.matchDetails}>Venue: {item.venue}</Text>
            <Text style={styles.matchDetails}>Date: {item.date}</Text>
            <Text style={styles.winnerText}>
              Winner: {item.result || "Match in progress"}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteMatch(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  logoutText: {
    color: "#E74C3C",
    fontSize: 16,
    fontWeight: "bold",
  },
  matchCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  team: {
    alignItems: "center",
    flex: 1,
  },
  teamLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  vsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  matchDetails: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 5,
  },
  winnerText: {
    fontSize: 16,
    color: "#27AE60",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LiveMatchesScreen;
