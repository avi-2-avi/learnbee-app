import { CustomButton } from "@/components/common/CustomButton";
import React from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";

export default function Register() {
  const handleGotoLogin = () => {
    router.replace("login");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Register</Text>
      <CustomButton title="Login" onPress={handleGotoLogin}></CustomButton>
    </View>
  );
}
