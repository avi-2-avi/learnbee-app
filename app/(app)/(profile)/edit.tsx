import { AppBarBack } from "@/components/common/AppBarBack";
import { user } from "@/test/user";
import { View, Image, Text } from "react-native";

export default function Edit() {
  return (
    <View className="bg-white w-full h-full">
      <AppBarBack />
      <View className="flex flex-col mx-auto mt-2">
        <Image
          className="w-20 h-20 rounded-full"
          source={{ uri: user.photo }}
        />
        <Text className="font-medium mt-2 text-center">Cambiar foto</Text>
      </View>
    </View>
  );
}
