import { AppBar } from "@/components/common/AppBar";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex flex-col">
      <AppBar />
      <Text>Homescreen page</Text>
    </View>
  );
}
