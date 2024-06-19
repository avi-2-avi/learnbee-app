import { View, Image, Pressable, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export const AppBar = () => {
  return (
    <View className="bg-yellow w-full h-18 flex flex-row justify-between items-center px-6 pt-4 pb-6 rounded-b-full">
      <Link
        href={{
          pathname: "(app)/(profile)/[id]",
          params: { id: "bacon" },
        }}
        asChild
      >
        <Pressable>
          <Ionicons name="person" size={28} color="black" />
        </Pressable>
      </Link>

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
  );
};
