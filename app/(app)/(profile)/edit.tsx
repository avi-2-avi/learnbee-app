import { AppBarBack } from "@/components/common/AppBarBack";
import { CustomButton } from "@/components/common/CustomButton";
import { updateUserData } from "@/hooks/userActions";
import { useUserData } from "@/hooks/userData";
import { useUserId } from "@/hooks/userUserId";
import { formatDate } from "@/utils/formatDate";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadUserProfilePicture } from "@/hooks/userActions";

export default function Edit() {
  const { userData } = useUserData();
  const [photo, setPhoto] = useState<string>(userData?.photo || "");
  const [description, setDescription] = useState<string>("");
  const uid = useUserId();

  useEffect(() => {
    if (userData) {
      setDescription(userData.description);
      setPhoto(userData.photo);
    }
  }, [userData]);

  const handleCancel = () => {
    router.back();
  };

  const handleSaveChanges = async () => {
    if (userData && uid) {
      try {
        let photoURL: string | null = userData.photo;
        if (photo !== userData.photo) {
          photoURL = await uploadUserProfilePicture(uid, photo);
        }
        await updateUserData(uid, description, photoURL);
        router.back();
      } catch (error) {
        console.error("Error updating description: ", error);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setPhoto(pickerResult.assets[0].uri);
    }
  };

  return (
    <View className="bg-white w-full h-full">
      <AppBarBack />
      {userData ? (
        <View>
          <View className="flex flex-col mx-auto mt-8 mb-8">
            <TouchableOpacity onPress={pickImage}>
              <Image
                className="w-20 h-20 rounded-full"
                source={{ uri: photo || userData.photo }}
              />
              <Text className="font-medium mt-2 text-center">Cambiar foto</Text>
            </TouchableOpacity>
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
        <View className="h-full w-full justify-center items-center">
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
    </View>
  );
}
