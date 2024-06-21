import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View className="bg-white w-full h-full">
      <Text>Details of user: {id} </Text>
      <TouchableOpacity className="pr-4" onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
