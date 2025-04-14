import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CricketContext } from "../contexts/CricketContext";

const MatchScreen = ({ navigation }) => {
  const { teams, players, updatePlayerStats } = useContext(CricketContext);
  const [currentBatsmen, setCurrentBatsmen] = useState([]);
  const [currentBowler, setCurrentBowler] = useState(null);
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });
  const [ballsBowled, setBallsBowled] = useState(0);
  const [matchStarted, setMatchStarted] = useState(false);

  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);
  const [showTeamSelection, setShowTeamSelection] = useState(true);
  const [showPlayerSelection, setShowPlayerSelection] = useState(false);

  const startMatch = () => {
    if (!selectedTeam1 || !selectedTeam2) {
      Alert.alert("Error", "Please select both teams");
      return;
    }
    setShowTeamSelection(false);
    setShowPlayerSelection(true);
  };

  const confirmPlayers = () => {
    if (currentBatsmen.length < 2 || !currentBowler) {
      Alert.alert("Error", "Please select 2 batsmen and 1 bowler");
      return;
    }
    setShowPlayerSelection(false);
    setMatchStarted(true);
  };

  const getTeamPlayers = (teamId) => {
    return players.filter((player) => player.teamId === teamId);
  };

  const addRun = (runs) => {
    setScore((prev) => ({ ...prev, runs: prev.runs + runs }));
    if (currentBatsmen[0]) {
      updatePlayerStats(currentBatsmen[0].id, { runs: runs });
    }
    updateBalls();
  };

  const addWicket = () => {
    setScore((prev) => ({ ...prev, wickets: prev.wickets + 1 }));
    if (currentBowler) {
      updatePlayerStats(currentBowler.id, { wickets: 1 });
    }
    updateBalls();
  };

  const updateBalls = () => {
    const newBalls = ballsBowled + 1;
    setBallsBowled(newBalls);
    if (newBalls % 6 === 0) {
      setScore((prev) => ({ ...prev, overs: prev.overs + 1 }));
    }
  };

  return (
    <View style={styles.container}>
      {showTeamSelection ? (
        <View style={styles.teamSelectionContainer}>
          <Text style={styles.sectionTitle}>Select Teams</Text>
          <View style={styles.teamSelection}>
            <View style={styles.teamOption}>
              <Text style={styles.teamLabel}>Team 1:</Text>
              {teams.map((team) => (
                <TouchableOpacity
                  key={team.id}
                  style={[
                    styles.teamButton,
                    selectedTeam1?.id === team.id && styles.selectedTeam,
                  ]}
                  onPress={() => setSelectedTeam1(team)}
                >
                  <Text style={styles.teamButtonText}>{team.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.teamOption}>
              <Text style={styles.teamLabel}>Team 2:</Text>
              {teams.map((team) => (
                <TouchableOpacity
                  key={team.id}
                  style={[
                    styles.teamButton,
                    selectedTeam2?.id === team.id && styles.selectedTeam,
                  ]}
                  onPress={() => setSelectedTeam2(team)}
                >
                  <Text style={styles.teamButtonText}>{team.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={startMatch}>
            <Text style={styles.confirmButtonText}>Confirm Teams</Text>
          </TouchableOpacity>
        </View>
      ) : showPlayerSelection ? (
        <View style={styles.playerSelectionContainer}>
          <Text style={styles.sectionTitle}>Select Players</Text>

          <View style={styles.playerSelectionSection}>
            <Text style={styles.playerLabel}>Batsmen (Select 2):</Text>
            <View style={styles.playerGrid}>
              {getTeamPlayers(selectedTeam1.id)
                .concat(getTeamPlayers(selectedTeam2.id))
                .map((player) => (
                  <TouchableOpacity
                    key={player.id}
                    style={[
                      styles.playerButton,
                      currentBatsmen.some((b) => b.id === player.id) &&
                        styles.selectedPlayer,
                    ]}
                    onPress={() => {
                      if (currentBatsmen.some((b) => b.id === player.id)) {
                        setCurrentBatsmen(
                          currentBatsmen.filter((b) => b.id !== player.id)
                        );
                      } else if (currentBatsmen.length < 2) {
                        setCurrentBatsmen([...currentBatsmen, player]);
                      }
                    }}
                  >
                    <Text style={styles.playerButtonText}>{player.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>

          <View style={styles.playerSelectionSection}>
            <Text style={styles.playerLabel}>Bowler:</Text>
            <View style={styles.playerGrid}>
              {getTeamPlayers(
                currentBatsmen[0]?.teamId === selectedTeam1.id
                  ? selectedTeam2.id
                  : selectedTeam1.id
              ).map((player) => (
                <TouchableOpacity
                  key={player.id}
                  style={[
                    styles.playerButton,
                    currentBowler?.id === player.id && styles.selectedPlayer,
                  ]}
                  onPress={() => setCurrentBowler(player)}
                >
                  <Text style={styles.playerButtonText}>{player.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmPlayers}
          >
            <Text style={styles.confirmButtonText}>Start Match</Text>
          </TouchableOpacity>
        </View>
      ) : !matchStarted ? (
        <TouchableOpacity style={styles.startButton} onPress={startMatch}>
          <Text style={styles.startButtonText}>Start Match</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.matchContainer}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              {score.runs}/{score.wickets} ({score.overs}.{ballsBowled % 6})
            </Text>
          </View>

          <View style={styles.controlsContainer}>
            <Text style={styles.controlLabel}>Add Runs:</Text>
            <View style={styles.runButtons}>
              {[0, 1, 2, 3, 4, 6].map((run) => (
                <TouchableOpacity
                  key={run}
                  style={styles.runButton}
                  onPress={() => addRun(run)}
                >
                  <Text style={styles.runButtonText}>{run}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.wicketButton} onPress={addWicket}>
              <Text style={styles.wicketButtonText}>Wicket</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  startButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  matchContainer: {
    marginTop: 20,
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  controlsContainer: {
    marginTop: 20,
  },
  controlLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  runButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  runButton: {
    backgroundColor: "#3498db",
    padding: 15,
    margin: 5,
    borderRadius: 10,
    minWidth: 50,
    alignItems: "center",
  },
  runButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  wicketButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  wicketButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  teamSelectionContainer: {
    width: "100%",
  },
  teamSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  teamOption: {
    width: "48%",
  },
  teamLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  teamButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  selectedTeam: {
    backgroundColor: "#2ecc71",
  },
  teamButtonText: {
    color: "white",
  },
  playerSelectionContainer: {
    width: "100%",
  },
  playerSelectionSection: {
    marginBottom: 20,
  },
  playerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  playerButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: 100,
    alignItems: "center",
  },
  selectedPlayer: {
    backgroundColor: "#2ecc71",
  },
  playerButtonText: {
    color: "white",
  },
  confirmButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default MatchScreen;
