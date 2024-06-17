import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex flex-col">
      <View className="bg-yellow-300 w-full h-10"></View>
      <View className="bg-yellow-300 rounded-full w-full h-10">
        <Text>Button</Text>
      </View>
      <Text>Homescreen page</Text>
    </View>
  );
}
