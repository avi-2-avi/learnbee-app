import { useEffect, useState } from "react";
import { Image, TextInput, View, Text } from "react-native";
import { router } from "expo-router";
import { useSession } from "../context/ctx";
import React from "react";
import { CustomButton } from "@/components/common/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Login() {
  const { signIn, session } = useSession();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    signIn(email, password);
  };

  const handleGotoRegister = () => {
    router.replace("register");
  };

  useEffect(() => {
    if (session) {
      router.replace("(app)");
    }
  }, [session]);

  return (
    <View className="flex flex-1 items-center justify-center w-[70%] mx-auto">
      <Image
        className="h-48 w-auto"
        source={require("../assets/images/bee.png")}
      />
      <TextInput
        className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-4"
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-2"
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Text className="text-xs font-light mb-4">¿Olvidó la contraseña?</Text>
      <CustomButton title="Ingresar" onPress={handleLogin}></CustomButton>
      <Text className="my-4">ó</Text>
      <CustomButton onPress={handleLogin} type="secondary">
        <View className="flex flex-row items-center space-x-8">
          <Ionicons name="logo-google" size={24} color="black" />
          <Text>Ingresa con Google</Text>
        </View>
      </CustomButton>
      <Text></Text>
      <CustomButton
        title="Registrarse"
        onPress={handleGotoRegister}
      ></CustomButton>
    </View>
  );
}
