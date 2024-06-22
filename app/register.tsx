import { CustomButton } from "@/components/common/CustomButton";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSession } from "../context/ctx";

export default function Register() {
  const { register, session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [dateText, setDateText] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDateText(currentDate.toLocaleDateString("es-ES")); // Format date as dd/mm/yyyy
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleGotoLogin = () => {
    router.replace("login");
  };

  const handleRegister = () => {
    const isValid = validateInputs();
    if (isValid) {
      register(name, email, date, password);
    }
  };

  const validateInputs = (): boolean => {
    let valid = false;
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!name) {
      Alert.alert("Error de validación", "El nombre es requerido");
    } else if (!email) {
      Alert.alert("Error de validación", "El correo es requerido");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error de validación", "El correo no es válido");
    } else if (!dateText) {
      Alert.alert("Error de validación", "La fecha de nacimiento es requerida");
    } else if (date > eighteenYearsAgo) {
      Alert.alert("Error de validación", "Debes tener al menos 18 años");
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
    <View className="flex flex-1 items-center justify-center w-[80%] mx-auto">
      <Image
        className="h-48 w-auto"
        source={require("../assets/images/bee.png")}
      />
      <Text className="w-full mb-1">Nombre y Apellidos</Text>
      <TextInput
        className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
        placeholder="Nombre y Apellidos"
        autoCapitalize="none"
        onChangeText={(text) => setName(text)}
      />
      <Text className="w-full mb-1">Correo</Text>
      <TextInput
        className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <View className="w-full">
        <Text className="w-full mb-1">Fecha de nacimiento</Text>
        <View className="flex-row items-center border-yellow border-[1rem] rounded-lg mb-3">
          <TextInput
            className="flex-1 p-4"
            placeholder="dd/mm/aaaa"
            value={dateText}
            editable={false}
          />
          <TouchableOpacity onPress={showDatepicker} className="pr-4">
            <Ionicons name="calendar-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Modal transparent={true} animationType="slide" visible={show}>
          <View className="flex-1 justify-center items-center">
            <View className="bg-white shadow-black shadow-lg rounded-lg p-8 flex flex-col justify-center items-center w-2/3">
              <Text className="text-center mb-4">Selecciona la fecha:</Text>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShow(false);
                  onChange(event, selectedDate);
                }}
              />
              <Text></Text>
              <CustomButton title="Confirmar" onPress={() => setShow(false)} />
            </View>
          </View>
        </Modal>
      </View>
      <Text className="w-full mb-1">Contraseña</Text>
      <View className="w-full flex flex-row items-center border-yellow border-[1rem] rounded-lg mb-5">
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
      <CustomButton title="Continuar" onPress={handleRegister}></CustomButton>
      <Text className="my-4">ó</Text>
      <CustomButton onPress={handleRegister} type="secondary">
        <View className="flex flex-row items-center space-x-8">
          <Ionicons name="logo-google" size={24} color="black" />
          <Text>Continuar con Google</Text>
        </View>
      </CustomButton>
      <View className="flex flex-row space-x-1">
        <Text className="text-xs font-light mt-3">¿Ya eres miembro?</Text>
        <Text className="text-xs font-medium mt-3" onPress={handleGotoLogin}>
          Iniciar sesión
        </Text>
      </View>
    </View>
  );
}
