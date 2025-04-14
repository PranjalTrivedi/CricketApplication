import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { CricketContext } from "../contexts/CricketContext";
import { Ionicons } from "@expo/vector-icons";

const TeamsScreen = ({ navigation }) => {
  const { teams, setTeams } = useContext(CricketContext);
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState("");

  const createTeam = () => {
    if (!teamName || !teamLogo) {
      Alert.alert("Error", "Please provide team name and logo.");
      return;
    }

    const newTeam = {
      id: Date.now().toString(),
      name: teamName,
      logo: teamLogo,
    };

    setTeams([...teams, newTeam]);
    setTeamName("");
    setTeamLogo("");
    Alert.alert("Success", "Team created successfully!");
  };

  const renderTeamItem = ({ item }) => (
    <View style={styles.teamItem}>
      <Text style={styles.teamName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Players", { teamId: item.id })}
      >
        <Ionicons name="chevron-forward" size={24} color="#3498db" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Teams</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Team Name"
          value={teamName}
          onChangeText={setTeamName}
          style={styles.input}
        />
        <TextInput
          placeholder="Team Logo URL"
          value={teamLogo}
          onChangeText={setTeamLogo}
          style={styles.input}
        />
        <TouchableOpacity style={styles.createButton} onPress={createTeam}>
          <Text style={styles.createButtonText}>Create Team</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.createButton,
            { backgroundColor: "#3498db", marginTop: 10 },
          ]}
          onPress={() => navigation.navigate("Match")}
        >
          <Text style={styles.createButtonText}>Start Match</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={teams}
        renderItem={renderTeamItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  createButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  teamItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#bdc3c7",
  },
  teamName: {
    fontSize: 18,
  },
});

export default TeamsScreen;
