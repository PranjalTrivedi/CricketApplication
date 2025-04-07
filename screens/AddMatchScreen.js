import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AddMatchScreen = ({ navigation }) => {
  const [newMatch, setNewMatch] = useState({
    team1: "",
    team2: "",
    team1Logo: "",
    team2Logo: "",
    venue: "",
    date: "",
    series: "",
    team1Score: "",
    team2Score: "",
    result: "",
  });

  const handleAddMatch = async () => {
    try {
      const matchData = {
        ...newMatch,
        result:
          newMatch.team1Score > newMatch.team2Score
            ? newMatch.team1
            : newMatch.team1Score < newMatch.team2Score
            ? newMatch.team2
            : "Draw",
      };

      await addDoc(collection(db, "matches"), matchData);
      Alert.alert("Success", "Match added successfully");
      setNewMatch({
        team1: "",
        team2: "",
        team1Logo: "",
        team2Logo: "",
        venue: "",
        date: "",
        series: "",
        team1Score: "",
        team2Score: "",
        result: "",
      });
      navigation.navigate("LiveMatches");
    } catch (error) {
      Alert.alert("Error", "Failed to add match");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Match</Text>

      <TextInput
        style={styles.input}
        placeholder="Team 1"
        value={newMatch.team1}
        onChangeText={(text) => setNewMatch({ ...newMatch, team1: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2"
        value={newMatch.team2}
        onChangeText={(text) => setNewMatch({ ...newMatch, team2: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 1 Logo URL"
        value={newMatch.team1Logo}
        onChangeText={(text) => setNewMatch({ ...newMatch, team1Logo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2 Logo URL"
        value={newMatch.team2Logo}
        onChangeText={(text) => setNewMatch({ ...newMatch, team2Logo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Venue"
        value={newMatch.venue}
        onChangeText={(text) => setNewMatch({ ...newMatch, venue: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={newMatch.date}
        onChangeText={(text) => setNewMatch({ ...newMatch, date: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Series Name (e.g. IPL, World Cup)"
        value={newMatch.series}
        onChangeText={(text) => setNewMatch({ ...newMatch, series: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 1 Score"
        value={newMatch.team1Score}
        onChangeText={(text) => setNewMatch({ ...newMatch, team1Score: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2 Score"
        value={newMatch.team2Score}
        onChangeText={(text) => setNewMatch({ ...newMatch, team2Score: text })}
        keyboardType="numeric"
      />

      <Button title="Add Match" onPress={handleAddMatch} color="#3498DB" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2C42",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#3498DB",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#FFF",
  },
});

export default AddMatchScreen;
