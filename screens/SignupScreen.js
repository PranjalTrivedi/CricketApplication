import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));

  // 🔹 Real-time validation errors
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // 🔹 Validation Functions
  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(text) ? "" : "Enter a valid email address.");
  };

  const validatePhoneNumber = (text) => {
    setPhoneNumber(text);
    const phoneRegex = /^[0-9]{7,15}$/;
    setPhoneError(
      phoneRegex.test(text) ? "" : "Enter a valid phone number (7-15 digits)."
    );
  };

  const validateFields = () => {
    if (!name.trim()) return "Full Name is required.";
    if (emailError) return emailError;
    if (phoneError) return phoneError;
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!address.trim()) return "Address is required.";
    if (!country.trim()) return "Country is required.";
    return null;
  };

  // 🔹 Handle Signup
  const handleSignup = async () => {
    const validationError = validateFields();
    if (validationError) {
      Alert.alert("Error", validationError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(collection(db, "users"), user.uid), {
        uid: user.uid,
        name,
        email,
        phoneNumber: `${countryCode} ${phoneNumber}`,
        address,
        country,
      });

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.replace("Home"),
        },
      ]);
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        message =
          "This email is already registered. Please use a different one or log in.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      }

      Alert.alert("Signup Failed", message);
    }
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create an Account</Text>

        {}
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={22}
            color="#3498db"
            style={styles.icon}
          />
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            style={styles.input}
          />
        </View>

        {}
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={22}
            color="#3498db"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {}
        <View style={styles.inputContainer}>
          <Ionicons
            name="call-outline"
            size={22}
            color="#3498db"
            style={styles.icon}
          />
          <TextInput
            placeholder="+1"
            value={countryCode}
            onChangeText={setCountryCode}
            style={styles.countryCodeInput}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={validatePhoneNumber}
            keyboardType="phone-pad"
            style={styles.phoneInput}
          />
        </View>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        {}
        <View style={styles.inputContainer}>
          <Ionicons
            name="location-outline"
            size={22}
            color="#3498db"
            style={styles.icon}
          />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            autoCapitalize="words"
            style={styles.input}
          />
        </View>

        {}
        <View style={styles.inputContainer}>
          <Ionicons
            name="earth-outline"
            size={22}
            color="#3498db"
            style={styles.icon}
          />
          <TextInput
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
            autoCapitalize="words"
            style={styles.input}
          />
        </View>

        {}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color="#3498db"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#3498db"
            />
          </TouchableOpacity>
        </View>

        {}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color="#3498db"
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#3498db"
            />
          </TouchableOpacity>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#3498db",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  countryCodeInput: {
    width: 50,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    height: 50,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 5,
  },
  signupButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 15,
    color: "#2c3e50",
    fontSize: 16,
  },
});
