import { View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export const AppBarBack = () => {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <View>
      <View className="bg-yellow w-full h-10"></View>
      <View className="bg-yellow w-full h-18 flex flex-row justify-between items-start px-10 pt-4 pb-6 rounded-b-full shadow-md">
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back-sharp" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
