import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const loginAndSaveToken = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (json.token) {
        // Save token to AsyncStorage
        await AsyncStorage.setItem("authToken", json.token);
        navigation.navigate("products");
      } else {
        console.log("Login failed or token not received");
        setErrorMessage("An error occurred during login. Please try again.");
      }
    } catch (error) {
      console.error("Error during login or saving token:", error);
      if (error.response && error.response.status === 401) {
        // Unauthorized access, username or password incorrect
        setErrorMessage("Incorrect username or password. Please try again.");
      } else {
        // Other errors, show generic error message
        setErrorMessage("An error occurred during login. Please try again.");
      }
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        navigation.navigate("index");
      }
    };
    // Add event listener for navigation focus
    const unsubscribe = navigation.addListener("focus", () => {
      checkAuthentication();
    });

    // Cleanup function to remove the event listener
    return unsubscribe;
  }, [navigation]); // Include navigation as a dependency

  return (
    <View style={[styles.pageContent]}>
      <View style={[styles.card]}>
        <View style={[styles.cardCenter]}>
          <View style={[styles.pe5, styles.ps5]}>
            <Text style={[styles.font800, styles.font40, styles.loginText]}>
              Login
            </Text>

            <View style={[styles.inputStyleClass]}>
              <Text style={[styles.colorBlueDark, styles.font10]}>
                Nom d'utilisateur
              </Text>
              <TextInput
                placeholder="username"
                style={[
                  styles.inputStyleinputClass,
                  styles.inputStyleHasIconinputClass,
                ]}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={[styles.inputStyleClass]}>
              <Text style={[styles.colorBlueDark, styles.font10]}>
                Mot de passe
              </Text>
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                placeholder="•••••"
                style={[
                  styles.inputStyleinputClass,
                  styles.inputStyleHasIconinputClass,
                ]}
              />
            </View>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <TouchableOpacity>
              <Text
                style={[
                  styles.btn,
                  styles.btnFull,
                  styles.btnMClass,
                  styles.font800,
                  styles.roundedSm,
                  styles.textUppercase,
                  styles.bgHighlightClass,
                ]}
                onPress={() => loginAndSaveToken()}
              >
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    zIndex: 90,
    paddingBottom: 300,
    backgroundColor: "#000",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  bgHighlightClass: {
    backgroundColor: "#0a7ea4",
    color: "#FFF",
  },
  colorBlueDark: {
    color: "#4A89DC",
  },
  font800: {
    fontWeight: "900",
  },
  font40: {
    fontSize: 40,
  },
  btnFull: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  btnMClass: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 12,
  },
  btn: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },

  card: {
    maxHeight: 15000,
    position: "relative",
    minWidth: 0,
    backgroundColor: "#f0f0f0",
    height: 900,
    overflow: "hidden",
    marginTop: 0,
    marginRight: 0,
    right: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  loginText: {
    fontFamily: "sans-serif",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
 
  pe5: {
    paddingEnd: 48,
  },
  ps5: {
    paddingStart: 48,
  },

  roundedSm: {
    borderRadius: 10,
  },
  
  cardCenter: {
    zIndex: 2,
    left: 0,
    right: 8,
    top: "10%",
  },
  inputStyleClass: {
    position: "relative",
    marginBottom: 15,
  },
  inputStyleinputClass: {
    fontSize: 14,
    width: "100%",
    lineHeight: 25,
    height: 40,
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderStartWidth: 0,
    padding: 0,
    borderRadius: 0,
    borderColor: "rgba(0, 0, 0, 0.08)",
  },


  inputStyleHasIconinputClass: {
    paddingStart: 25,
  },

 
  font10: {
    fontSize: 13,
  },
});

export default LoginScreen;
