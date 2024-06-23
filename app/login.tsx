import { useEffect, useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet
} from "react-native";
import { router } from "expo-router";
import { useSession } from "../context/ctx";
import React from "react";
import { CustomButton } from "@/components/common/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Login() {
  const { signIn, session } = useSession();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleLogin = async () => {
    const isValid = validateInputs();
    if (isValid) {
      signIn(email, password);
    }
  };

  const handleGotoRegister = () => {
    router.replace("register");
  };

  const validateInputs = (): boolean => {
    let valid = false;
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!email) {
      Alert.alert("Error de validación", "El correo es requerido");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error de validación", "El correo no es válido");
    } else if (!password) {
      Alert.alert("Error de validación", "La contraseña es requerida");
    } else if (password.length < 6) {
      Alert.alert(
        "Error de validación",
        "La contraseña debe tener al menos 6 caracteres",
      );
    } else if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error de validación",
        "La contraseña debe tener al menos un número y un carácter especial",
      );
    } else {
      valid = true;
    }

    return valid;
  };

  useEffect(() => {
    if (session) {
      router.replace("(app)");
    }
  }, [session]);

  return (
    <View className="flex flex-1 items-center justify-center w-[80%] mx-auto bg-white">
      <Image
        className="h-48 w-auto"
        source={require("../assets/images/bee.png")}
      />
      <TextInput
        className="w-full p-4 border-yellow rounded-lg mb-4"
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={(text) => setEmail(text)
        }
      />
      <View className="w-full flex flex-row items-center border-yellow rounded-lg mb-2" 
        style={styles.input}
      >
        <TextInput
          className="flex-1 p-4"
          placeholder="Contraseña"
          autoCapitalize="none"
          secureTextEntry={!passwordVisible}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          className="pr-4"
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
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


const styles = StyleSheet.create({
  input: {
    borderColor: "#F9CD14",
    borderWidth: 1,
    borderRadius: 10,
  },
});