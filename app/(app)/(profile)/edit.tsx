import { AppBarBack } from "@/components/common/AppBarBack";
import { CustomButton } from "@/components/common/CustomButton";
import { user } from "@/test/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { View, Image, Text, TextInput } from "react-native";

export default function Edit() {
  const handleCancel = () => {
    router.back();
  };

  const handleSaveChanges = () => {
    router.back();
  };

  const [description, setDescription] = useState<string>(user.description);
  return (
    <View className="bg-white w-full h-full">
      <AppBarBack />
      <View className="flex flex-col mx-auto mt-8 mb-8">
        <Image
          className="w-20 h-20 rounded-full"
          source={{ uri: user.photo }}
        />
        <Text className="font-medium mt-2 text-center">Cambiar foto</Text>
      </View>
      <View className="w-[80%] mx-auto mb-4 mt-2">
        <Text className="w-full mb-1">Nombre y Apellidos</Text>
        <TextInput
          className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
          editable={false}
          value={user.name}
        />
        <Text className="w-full mb-1">Correo</Text>
        <TextInput
          className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
          editable={false}
          value={user.email}
        />
        <Text className="w-full mb-1">Fecha de nacimiento</Text>
        <View className="flex-row items-center border-yellow border-[1rem] rounded-lg mb-3">
          <TextInput
            className="flex-1 p-4"
            placeholder="dd/mm/aaaa"
            value={user.birthDate}
            editable={false}
          />
          <View className="pr-4">
            <Ionicons name="calendar-outline" size={24} color="black" />
          </View>
        </View>
        <Text className="w-full mb-1">Descripción corta</Text>
        <TextInput
          className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
          editable
          inputMode="text"
          multiline
          numberOfLines={4}
          maxLength={200}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <View className="flex flex-row space-x-6 mx-auto mt-6 mb-2">
          <CustomButton
            onPress={handleCancel}
            type="secondary"
            title="Cancelar"
            className="basis-36"
          ></CustomButton>
          <CustomButton
            onPress={handleSaveChanges}
            title="Guardar"
            className="basis-36"
          ></CustomButton>
        </View>
      </View>
    </View>
  );
}
