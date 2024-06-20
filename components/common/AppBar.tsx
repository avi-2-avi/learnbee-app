import { View, Image, TouchableOpacity, Modal, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useSession } from "@/context/ctx";
import { CustomButton } from "./CustomButton";
import { user } from "@/test/user";
import { router } from "expo-router";

export const AppBar = () => {
  const { signOut } = useSession();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const handleSignOut = () => {
    signOut();
    setProfileMenuVisible(false);
  };

  const handleGotoProfile = () => {
    router.navigate("(profile)/" + user.id);
    setProfileMenuVisible(false);
  };

  return (
    <View>
      <View className="bg-yellow w-full h-10"></View>
      <View className="bg-yellow w-full h-18 flex flex-row justify-between items-center px-10 pt-4 pb-6 rounded-b-full shadow-md">
        <TouchableOpacity onPress={() => setProfileMenuVisible(true)}>
          <Ionicons name="person" size={28} color="black" />
        </TouchableOpacity>

        <Image
          className="w-10 h-8"
          source={require("../../assets/images/icon.png")}
        />
        <TouchableOpacity
          onPress={() => alert("No hay notificaciones recientes.")}
        >
          <Ionicons name="notifications-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={profileMenuVisible}
        animationType="fade"
        onRequestClose={() => setProfileMenuVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setProfileMenuVisible(false)}
          className="flex-1 bg-black/30 justify-end"
        >
          <View className="absolute left-10 top-24 bg-white p-5 w-[70%] rounded-lg">
            <View className="flex flex-row items-center space-x-4 mb-4">
              <Image
                className="w-12 h-12 rounded-full"
                source={{ uri: user.photo }}
              />
              <View className="flex flex-col">
                <Text className="font-medium">{user.name}</Text>
                <Text className="text-xs mt-0.5">{user.description}</Text>
              </View>
            </View>
            <CustomButton
              onPress={handleGotoProfile}
              flatten
              title="Ver Perfil"
            />
            <Text></Text>
            <CustomButton
              flatten
              onPress={handleSignOut}
              title="Cerrar Sesión"
              type="secondary"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
