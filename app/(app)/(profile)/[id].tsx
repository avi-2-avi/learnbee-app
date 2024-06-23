import {
  View,
  Text,
  Share,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { AppBarBack } from "@/components/common/AppBarBack";
import { useState } from "react";
import { CustomButton } from "@/components/common/CustomButton";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostList } from "@/components/posts/PostList";
import { useUserData } from "@/hooks/userData";

const Tab = createMaterialTopTabNavigator();
function CompletedProjects() {
  return <PostList useFullScreenHeight />;
}

function OngoingProjects() {
  return <PostList useFullScreenHeight isInProgress />;
}

export default function DetailsScreen() {
  const [totalProjects, setTotalProjects] = useState(10);
  const [followers, setFollowers] = useState(136);
  const [followings, setFollowings] = useState(136);
  const { userData, loading } = useUserData();

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

  return (
    <View className="bg-white w-full h-full">
      <AppBarBack />
      <View className="w-[80%] mx-auto mb-4 mt-2">
        {userData ? (
          <View className="flex flex-row space-x-6">
            <Image
              className="w-20 h-20 rounded-full"
              source={{ uri: userData.photo }}
            />
            <View className="flex flex-col justify-center">
              <Text className="font-medium">{userData.name}</Text>
              <Text className="font-light mt-2">{userData.description}</Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#000000" />
        )}
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
      <View className="flex flex-row space-x-6 mx-auto mt-6 mb-2">
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
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "black",
          },
          tabBarLabelStyle: {
            textTransform: "capitalize",
          },
        }}
      >
        <Tab.Screen name="Proyectos Concluidos" component={CompletedProjects} />
        <Tab.Screen name="Proyectos en Curso" component={OngoingProjects} />
      </Tab.Navigator>
    </View>
  );
}
