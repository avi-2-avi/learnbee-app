import { AppBar } from "@/components/common/AppBar";
import { OptionsButton } from "@/components/homepage/OptionsButton";
import { PostList } from "@/components/posts/PostList";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex flex-col">
      <AppBar />
      <PostList />
      <OptionsButton />
    </View>
  );
}
