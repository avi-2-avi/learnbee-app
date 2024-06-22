import { useLocalSearchParams } from "expo-router";
import { View, Text, Share, Alert, Image } from "react-native";
import { router } from "expo-router";
import { AppBarBack } from "@/components/common/AppBarBack";
import { useState } from "react";
import { CustomButton } from "@/components/common/CustomButton";
import { user } from "@/test/user";

export default function DetailsScreen() {
  const [totalProjects, setTotalProjects] = useState(10);
  const [followers, setFollowers] = useState(136);
  const [followings, setFollowings] = useState(136);
  const { id } = useLocalSearchParams();

  const handleGoProfile = () => {
    router.navigate("(profile)/edit");
  };

  const handleShareProfile = async () => {
    try {
      const result = await Share.share({
        message: "Este es mi perfil de Learn Bee!",
      });
      if (result.action === Share.sharedAction) {
        Alert.alert(
          "Perfil compartido",
          "Su perfil ha sido compartido exitosamente.",
        );
      } else if (result.action === Share.dismissedAction) {
        Alert.alert(
          "Compartir Cancelado",
          "El compartido del perfil fue cancelado.",
        );
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al compartir el perfil.");
      console.error("Error al compartir el perfil: ", error);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View className="bg-white w-full h-full">
      <AppBarBack />
      <View className="w-[80%] mx-auto mb-4 mt-2">
        <View className="flex flex-row space-x-6">
          <Image
            className="w-20 h-20 rounded-full"
            source={{ uri: user.photo }}
          />
          <View className="flex flex-col justify-center">
            <Text className="font-medium">{user.name}</Text>
            <Text className="font-light mt-2">{user.description}</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-around w-[80%] mx-auto text-center">
        <View>
          <Text className="font-medium text-center mb-1">{totalProjects}</Text>
          <Text className="text-center">proyectos</Text>
        </View>
        <View>
          <Text className="font-medium text-center mb-1">{followers}</Text>
          <Text className="text-center">seguidores</Text>
        </View>
        <View>
          <Text className="font-medium text-center mb-1">{followings}</Text>
          <Text className="text-center">seguiendo</Text>
        </View>
      </View>
      <View className="flex flex-row space-x-6 mx-auto mt-6">
        <CustomButton
          onPress={handleGoProfile}
          type="secondary"
          title="Editar Perfil"
          className="basis-36"
        ></CustomButton>
        <CustomButton
          onPress={handleShareProfile}
          type="secondary"
          title="Compartir Perfil"
          className="basis-36"
        ></CustomButton>
      </View>
    </View>
  );
}
