import { AppBarBack } from "@/components/common/AppBarBack";
import { CustomButton } from "@/components/common/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

export default function Survey() {
  const [numStudents, setNumStudents] = useState<number>(0);

  const handleGoBack = () => {
    router.back();
  };

  const handlePublish = () => {
    router.replace("(app)");
  };

  const handleAddNumStudents = () => {
    setNumStudents(numStudents + 1);
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
            onPress={handleGoBack}
            title="Generar QR"
            className="basis-1/2"
          ></CustomButton>
        </View>
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
              className="p-2 border-yellow border-[1rem] rounded-lg ml-1 mr-1"
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
      </View>
    </View>
  );
}
