import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const FeedScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("forYou");
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerScrollRef = useRef(null);

  // Auto-scroll banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextBanner = (currentBanner + 1) % 3;
      setCurrentBanner(nextBanner);
      bannerScrollRef.current?.scrollTo({
        x: Dimensions.get("window").width * nextBanner,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentBanner]);

  // Sample posts data - 10 posts
  const posts = [
    {
      id: 1,
      username: "cricket_lover",
      likes: 1243,
      comments: 42,
      caption: "Great match today! #CricketFever",
      time: "2 HOURS AGO",
      image: require("../assets/cricket-field.jpg"),
    },
    {
      id: 2,
      username: "team_india",
      likes: 3456,
      comments: 89,
      caption: "Victory celebration! 🏆 #Champions",
      time: "5 HOURS AGO",
      image: require("../assets/logo.png"),
    },
    {
      id: 3,
      username: "stadium_live",
      likes: 876,
      comments: 23,
      caption: "Match day atmosphere! #LiveCricket",
      time: "1 DAY AGO",
      image: require("../assets/cricket-field.jpg"),
    },
    {
      id: 4,
      username: "batting_skills",
      likes: 543,
      comments: 12,
      caption: "Practicing my shots #Training",
      time: "2 DAYS AGO",
      image: require("../assets/logo.png"),
    },
    {
      id: 5,
      username: "bowling_pro",
      likes: 765,
      comments: 34,
      caption: "New bowling technique #FastBowler",
      time: "3 DAYS AGO",
      image: require("../assets/cricket-field.jpg"),
    },
    {
      id: 6,
      username: "cricket_gear",
      likes: 432,
      comments: 7,
      caption: "New bat just arrived! #Equipment",
      time: "4 DAYS AGO",
      image: require("../assets/logo.png"),
    },
    {
      id: 7,
      username: "umpire_view",
      likes: 321,
      comments: 5,
      caption: "From the umpire's perspective #Officiating",
      time: "1 WEEK AGO",
      image: require("../assets/cricket-field.jpg"),
    },
    {
      id: 8,
      username: "coach_tips",
      likes: 987,
      comments: 45,
      caption: "Training session with the team #Coaching",
      time: "1 WEEK AGO",
      image: require("../assets/logo.png"),
    },
    {
      id: 9,
      username: "fan_club",
      likes: 654,
      comments: 21,
      caption: "Supporting our team! #FanLove",
      time: "2 WEEKS AGO",
      image: require("../assets/cricket-field.jpg"),
    },
    {
      id: 10,
      username: "cricket_history",
      likes: 234,
      comments: 8,
      caption: "Throwback to classic matches #Memories",
      time: "3 WEEKS AGO",
      image: require("../assets/logo.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab Navigation */}
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

      {/* Main Scroll View (includes banner and posts) */}
      <ScrollView style={styles.mainScroll}>
        {/* Horizontal Scrolling Banner */}
        <View style={styles.bannerContainer}>
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <View style={[styles.bannerItem, { backgroundColor: "#1DA1F2" }]}>
              <Text style={styles.bannerText}>IPL 2023: Mumbai vs Chennai</Text>
              <Text style={styles.bannerSubtext}>Starts in 2 days</Text>
            </View>
            <View style={[styles.bannerItem, { backgroundColor: "#FF4500" }]}>
              <Text style={styles.bannerText}>World Cup Qualifiers</Text>
              <Text style={styles.bannerSubtext}>Live Now</Text>
            </View>
            <View style={[styles.bannerItem, { backgroundColor: "#3CB371" }]}>
              <Text style={styles.bannerText}>Local Tournament Finals</Text>
              <Text style={styles.bannerSubtext}>Tomorrow at 3 PM</Text>
            </View>
          </ScrollView>
        </View>

        {/* Posts Feed */}
        {activeTab === "forYou" ? (
          posts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <View style={styles.postHeader}>
                <View style={styles.postUser}>
                  <View style={styles.postAvatar} />
                  <Text style={styles.postUsername}>{post.username}</Text>
                </View>
                <MaterialCommunityIcons name="dots-horizontal" size={20} />
              </View>

              <Image
                source={post.image}
                style={styles.postImage}
                resizeMode="cover"
              />

              <View style={styles.postActions}>
                <View style={styles.postActionLeft}>
                  <FontAwesome
                    name="heart-o"
                    size={24}
                    style={styles.postActionIcon}
                  />
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={24}
                    style={styles.postActionIcon}
                  />
                  <Feather
                    name="send"
                    size={24}
                    style={styles.postActionIcon}
                  />
                </View>
                <MaterialCommunityIcons name="bookmark-outline" size={24} />
              </View>

              <Text style={styles.postLikes}>
                {post.likes.toLocaleString()} likes
              </Text>
              <Text style={styles.postCaption}>
                <Text style={styles.postUsername}>{post.username} </Text>
                {post.caption}
              </Text>
              <Text style={styles.postComments}>
                View all {post.comments} comments
              </Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          ))
        ) : (
          <>
            <Text style={styles.feedItem}>Club news 1</Text>
            <Text style={styles.feedItem}>Club news 2</Text>
            <Text style={styles.feedItem}>Club news 3</Text>
          </>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home" size={24} color="#007AFF" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="search" size={20} color="#888" />
          <Text style={styles.footerButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialCommunityIcons name="cricket" size={22} color="#888" />
          <Text style={styles.footerButtonText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="people" size={20} color="#888" />
          <Text style={styles.footerButtonText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Feather name="user" size={20} color="#888" />
          <Text style={styles.footerButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScroll: {
    flex: 1,
    marginBottom: 50, // Space for footer
  },
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
  bannerContainer: {
    height: 180,
  },
  bannerItem: {
    width: Dimensions.get("window").width,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  bannerSubtext: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  postContainer: {
    marginBottom: 25,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  postUsername: {
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  postActionLeft: {
    flexDirection: "row",
  },
  postActionIcon: {
    marginRight: 15,
  },
  postLikes: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  postCaption: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  postComments: {
    color: "#8e8e8e",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  postTime: {
    color: "#8e8e8e",
    fontSize: 10,
    paddingHorizontal: 10,
    textTransform: "uppercase",
  },
  feedItem: {
    fontSize: 18,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  footerButton: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  footerButtonText: {
    fontSize: 12,
    marginTop: 4,
    color: "#888",
  },
});

export default FeedScreen;
