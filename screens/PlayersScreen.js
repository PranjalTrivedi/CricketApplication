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

const PlayersScreen = () => {
  const { players, setPlayers, teams } = useContext(CricketContext);
  const [playerName, setPlayerName] = useState("");
  const [playerRole, setPlayerRole] = useState("Batsman");
  const [selectedTeam, setSelectedTeam] = useState("");

  const createPlayer = () => {
    if (!playerName || !selectedTeam) {
      Alert.alert("Error", "Please provide player name and select a team");
      return;
    }

    const newPlayer = {
      id: Date.now().toString(),
      name: playerName,
      role: playerRole,
      teamId: selectedTeam,
      stats: {
        matches: 0,
        runs: 0,
        wickets: 0,
      },
    };

    setPlayers([...players, newPlayer]);
    setPlayerName("");
    setSelectedTeam("");
    Alert.alert("Success", "Player created successfully!");
  };

  const renderPlayerItem = ({ item }) => {
    const playerTeam = teams.find((team) => team.id === item.teamId);
    return (
      <View style={styles.playerItem}>
        <View>
          <Text style={styles.playerName}>{item.name}</Text>
          <Text style={styles.playerDetails}>
            {item.role} • {playerTeam?.name || "No Team"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Player Stats",
              `Runs: ${item.stats.runs}\nWickets: ${item.stats.wickets}`
            )
          }
        >
          <Ionicons name="stats-chart" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Players</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Player Name"
          value={playerName}
          onChangeText={setPlayerName}
          style={styles.input}
        />
        <View style={styles.roleContainer}>
          {["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"].map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleButton,
                playerRole === role && styles.selectedRoleButton,
              ]}
              onPress={() => setPlayerRole(role)}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  playerRole === role && styles.selectedRoleButtonText,
                ]}
              >
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {teams.length > 0 ? (
          <View style={styles.teamSelection}>
            <Text style={styles.teamSelectionLabel}>Assign to Team:</Text>
            <View style={styles.teamButtons}>
              {teams.map((team) => (
                <TouchableOpacity
                  key={team.id}
                  style={[
                    styles.teamButton,
                    selectedTeam === team.id && styles.selectedTeamButton,
                  ]}
                  onPress={() => setSelectedTeam(team.id)}
                >
                  <Text
                    style={[
                      styles.teamButtonText,
                      selectedTeam === team.id && styles.selectedTeamButtonText,
                    ]}
                  >
                    {team.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.noTeamsText}>
            No teams available. Create teams first.
          </Text>
        )}
        <TouchableOpacity
          style={styles.createButton}
          onPress={createPlayer}
          disabled={!selectedTeam}
        >
          <Text style={styles.createButtonText}>Create Player</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={players}
        renderItem={renderPlayerItem}
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
    borderColor: "#bdc3c7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  roleButton: {
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
  },
  selectedRoleButton: {
    backgroundColor: "#2ecc71",
  },
  roleButtonText: {
    color: "#2c3e50",
  },
  selectedRoleButtonText: {
    color: "white",
  },
  teamSelection: {
    marginBottom: 15,
  },
  teamSelectionLabel: {
    marginBottom: 5,
    color: "#7f8c8d",
  },
  teamButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  teamButton: {
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
  },
  selectedTeamButton: {
    backgroundColor: "#3498db",
  },
  teamButtonText: {
    color: "#2c3e50",
  },
  selectedTeamButtonText: {
    color: "white",
  },
  noTeamsText: {
    color: "#e74c3c",
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    opacity: 1,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  playerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#bdc3c7",
  },
  playerName: {
    fontSize: 18,
    fontWeight: "500",
  },
  playerDetails: {
    color: "#7f8c8d",
  },
});

export default PlayersScreen;
