import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MatchDetailsScreen = ({ route }) => {
  const [match, setMatch] = React.useState(null);
  const matchId = route.params?.matchId;

  React.useEffect(() => {
    const fetchMatch = async () => {
      const docRef = doc(db, "matches", matchId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMatch(docSnap.data());
      }
    };
    fetchMatch();
  }, [matchId]);

  const calculateResult = () => {
    const team1Score = parseInt(match.team1Score);
    const team2Score = parseInt(match.team2Score);

    if (team1Score > team2Score) {
      return `${match.team1} won by ${team1Score - team2Score} runs`;
    } else if (team2Score > team1Score) {
      return `${match.team2} won by ${team2Score - team1Score} runs`;
    } else {
      return "Match Drawn";
    }
  };

  if (!match)
    return (
      <View style={styles.container}>
        <Text style={styles.detail}>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Details</Text>

      <View style={styles.matchInfo}>
        <Text style={styles.team}>{match.team1}</Text>
        <Text style={styles.score}>{match.team1Score}</Text>
        <Text style={styles.vs}>vs</Text>
        <Text style={styles.team}>{match.team2}</Text>
        <Text style={styles.score}>{match.team2Score}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detail}>Series: {match.series}</Text>
        <Text style={styles.detail}>Venue: {match.venue}</Text>
        <Text style={styles.detail}>Date: {match.date}</Text>
        <Text style={styles.detail}>Result: {match.result}</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.finalResult}>Final Result: {calculateResult()}</Text>
      </View>
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
  matchInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  team: {
    fontSize: 18,
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498DB",
    marginHorizontal: 10,
  },
  vs: {
    fontSize: 16,
    color: "#FFFFFF",
    marginHorizontal: 10,
  },
  details: {
    marginTop: 20,
  },
  detail: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#0f3811",
    borderRadius: 10,
  },
  finalResult: {
    color: "limegreen",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MatchDetailsScreen;
