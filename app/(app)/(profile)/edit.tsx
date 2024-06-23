import { AppBarBack } from "@/components/common/AppBarBack";
import { CustomButton } from "@/components/common/CustomButton";
import { updateUserDescription } from "@/hooks/userActions";
import { useUserData } from "@/hooks/userData";
import { useUserId } from "@/hooks/userUserId";
import { user } from "@/test/user";
import { formatDate } from "@/utils/formatDate";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, Text, TextInput, ActivityIndicator } from "react-native";

export default function Edit() {
  const { userData, loading } = useUserData();
  const [description, setDescription] = useState<string>("");
  const uid = useUserId();

  useEffect(() => {
    if (userData) {
      setDescription(userData.description);
    }
  }, [userData]);

  const handleCancel = () => {
    router.back();
  };

  const handleSaveChanges = async () => {
    if (userData && uid) {
      try {
        await updateUserDescription(uid, description);
        router.back();
      } catch (error) {
        console.error("Error updating description: ", error);
      }
    }
  };

  return (
    <View className="bg-white w-full h-full">
      <AppBarBack />
      {userData ? (
        <View>
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
              value={userData.name}
            />
            <Text className="w-full mb-1">Correo</Text>
            <TextInput
              className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
              editable={false}
              value={userData.email}
            />
            <Text className="w-full mb-1">Fecha de nacimiento</Text>
            <View className="flex-row items-center border-yellow border-[1rem] rounded-lg mb-3">
              <TextInput
                className="flex-1 p-4"
                placeholder="dd/mm/aaaa"
                value={formatDate(userData.birthDate)}
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
      ) : (
        <ActivityIndicator size="large" color="#000000" />
      )}
    </View>
  );
}
