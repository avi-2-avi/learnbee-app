import { View, FlatList } from "react-native";
import React from "react";
import { posts } from "@/test/posts";
import { PostItem } from "./PostItem";

export const PostList = () => {
  return (
    <View className="w-full flex flex-col my-2 mb-36">
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem
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
