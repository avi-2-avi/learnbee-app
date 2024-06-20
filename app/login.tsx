import { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { router } from "expo-router";
import { useSession } from "../context/ctx";
import React from "react";

export default function Login() {
  const { signIn, session } = useSession();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    signIn(email, password);
  };

  useEffect(() => {
    if (session) {
      router.replace("(app)");
    }
  }, [session]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={{ backgroundColor: "white", width: "80%", padding: 10 }}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ backgroundColor: "white", width: "80%", padding: 10 }}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title={"Login"} onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
