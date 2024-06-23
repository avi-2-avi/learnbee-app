import { AppBarBack } from "@/components/common/AppBarBack";
import { CustomButton } from "@/components/common/CustomButton";
import { updateProject } from "@/hooks/projectActions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function Survey() {
  const [numStudents, setNumStudents] = useState<number>(0);
  const [showQR, setShowQR] = useState<boolean>(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleGoBack = () => {
    router.replace("(app)");
  };

  const handlePublish = async () => {
    const rating = Math.floor(Math.random() * 5) + 1;
    try {
      await updateProject(id!, numStudents, rating);
      Alert.alert("Enhorabuena", "Su proyecto a sido publicado");
      router.replace("(app)");
    } catch (error) {
      Alert.alert("Error", "No se ha podido publicar su proyecto.");
    }
  };

  const handleAddNumStudents = () => {
    setNumStudents(numStudents + 1);
  };

  const handleShowQR = () => {
    setShowQR(true);
  };

  return (
    <View className="w-full h-full bg-white">
      <AppBarBack />
      <View className="flex flex-col w-[80%] mx-auto pt-6">
        <Text className="font-medium text-lg mb-2">Encuesta estudiantil</Text>
        <Text>
          ¿Desear realizar la encuesta para que tus alumnos evaluen el proyecto?
        </Text>
        <View className="flex flex-row w-[90%] space-x-6 mt-6">
          <CustomButton
            onPress={handleGoBack}
            type="secondary"
            title="Más tarde"
            className="basis-1/2"
          ></CustomButton>
          <CustomButton
            onPress={handleShowQR}
            title="Generar QR"
            className="basis-1/2"
          ></CustomButton>
        </View>
        {showQR && (
          <View className="w-full items-center mt-10">
            <Text className="font-medium mb-2">
              ¡Conéctate con este código QR!
            </Text>
            <Text>Usa tu celular para escanearlo</Text>
            <Image
              className="mt-2 mb-6"
              source={require("@/assets/images/qr-code.png")}
            />
            <View className="flex flex-row items-center mb-10">
              <Text className="font-medium mb-2">Encuesta realizada por </Text>
              <TouchableOpacity
                onPress={handleAddNumStudents}
                style={styles.input}
                className="p-2 border-yellow rounded-lg ml-1 mr-1"
              >
                <Text>{numStudents} estudiantes</Text>
              </TouchableOpacity>
              <Ionicons name="list" size={24} color="black" />
            </View>
            <View className="w-full items-end">
              <CustomButton
                onPress={handlePublish}
                title="Publicar"
                className="w-1/2"
              ></CustomButton>
            </View>
          </View>
        )}
      </View>
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
