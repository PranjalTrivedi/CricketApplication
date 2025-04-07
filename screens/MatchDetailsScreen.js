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

  if (!match)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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
});

export default MatchDetailsScreen;
