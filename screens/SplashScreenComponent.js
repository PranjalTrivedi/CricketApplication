import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Image } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent({ onFinish }) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const prepare = async () => {
      try {
        // Keep splash screen visible
        await SplashScreen.preventAutoHideAsync();

        // Start animation after 500ms
        const timer = setTimeout(() => {
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 1,
            useNativeDriver: true,
          }).start();
        }, 500);

        // Wait minimum 3 seconds then hide splash
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        onFinish();
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/CricketIcon.png")}
        style={[
          styles.image,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
        onLoadEnd={() => {
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
