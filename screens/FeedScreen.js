import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
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
import Header from "../components/Header";
import Footer from "../components/Footer";

const FeedScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("forYou");
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerScrollRef = useRef(null);

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
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView style={styles.mainScroll}>
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

      <Footer navigation={navigation} />
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
    marginBottom: 50,
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtext: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
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
    paddingLeft: 10,
  },
  postCaption: {
    padding: 10,
  },
  postComments: {
    color: "#888",
    paddingLeft: 10,
  },
  postTime: {
    color: "#888",
    fontSize: 10,
    paddingLeft: 10,
    marginTop: 5,
  },
  feedItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default FeedScreen;
