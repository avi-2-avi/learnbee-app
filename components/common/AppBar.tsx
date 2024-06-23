import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useSession } from "@/context/ctx";
import { CustomButton } from "./CustomButton";
import { router } from "expo-router";
import { NotificationItem } from "../homepage/NotificationItem";
import { notifications } from "@/test/notifications";
import { useUserData } from "@/hooks/userData";
import { useUserId } from "@/hooks/userUserId";

export const AppBar = () => {
  const { signOut } = useSession();
  const { userData, loading } = useUserData();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [notificationMenuVisible, setNotificationMenuVisible] = useState(false);
  const uid = useUserId();

  const handleSignOut = () => {
    signOut();
    setProfileMenuVisible(false);
  };

  const handleGotoProfile = () => {
    if (uid) {
      router.navigate("(profile)/" + uid);
      setProfileMenuVisible(false);
    }
  };

  if (loading) {
    return (
      <View>
        <View className="bg-yellow w-full h-10"></View>
        <View className="bg-yellow w-full h-18 flex flex-row justify-center items-center px-10 pt-4 pb-6 rounded-b-full shadow-md">
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </View>
    );
  }

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
        <TouchableOpacity onPress={() => setNotificationMenuVisible(true)}>
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
            {userData ? (
              <>
                <View className="flex flex-row items-center space-x-4 mb-4">
                  <Image
                    className="w-12 h-12 rounded-full"
                    source={{ uri: userData.photo }}
                  />
                  <View className="flex flex-col">
                    <Text className="font-medium">{userData.name}</Text>
                    <Text className="text-xs mt-0.5">
                      {userData.description}
                    </Text>
                  </View>
                </View>
                <CustomButton
                  onPress={handleGotoProfile}
                  flatten
                  title="Ver Perfil"
                />
              </>
            ) : (
              <Text>Cargando data del usuario...</Text>
            )}
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
      <Modal
        transparent={true}
        visible={notificationMenuVisible}
        animationType="fade"
        onRequestClose={() => setNotificationMenuVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setNotificationMenuVisible(false)}
          className="flex-1 bg-black/30 justify-end"
        >
          <View className="absolute right-10 top-24 bg-white p-5 pb-3 w-[80%] rounded-lg">
            <Text className="text-lg font-medium mb-4">Notificaciones</Text>
            <FlatList
              data={notifications}
              renderItem={({ item }) => (
                <NotificationItem
                  photo={item.photo}
                  name={item.name}
                  datetime={item.datetime}
                  type={item.type}
                  projectName={item.projectName}
                />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
