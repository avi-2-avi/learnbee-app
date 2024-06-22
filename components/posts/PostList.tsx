import { View, FlatList } from "react-native";
import React from "react";
import { posts } from "@/test/posts";
import { PostItem } from "./PostItem";

interface PostListProps {
  useFullScreenHeight?: boolean;
  isInProgress?: boolean;
}

export const PostList: React.FC<PostListProps> = ({
  useFullScreenHeight = false,
  isInProgress = false,
}) => {
  const height = useFullScreenHeight ? "h-full" : "mb-56";

  return (
    <View className={`bg-white w-full flex flex-col mt-2 ` + height}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem
            isInProgress={isInProgress}
            photo={item.photo}
            name={item.name}
            rating={item.rating}
            title={item.title}
            description={item.description}
          />
        )}
      />
    </View>
  );
};
