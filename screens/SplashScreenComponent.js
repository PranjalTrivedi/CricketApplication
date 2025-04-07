import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent({ onFinish }) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(10)).current;

  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textOpacityAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          setIsAnimationComplete(true);
          onFinish();
        }, 1000);
      });
    };

    setTimeout(startAnimation, 100);
  }, []);

  if (isAnimationComplete) return null;

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/CricketIcon.png")}
        style={[
          styles.logo,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        ]}
      />
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: textOpacityAnim,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        Live Cricket
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e67e22",
    marginTop: 20,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
