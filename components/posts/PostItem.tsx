import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { styled } from "nativewind";
import { RatingIcons } from "./RatingIcons";

interface PostItemProps {
  photo: string;
  name: string;
  rating: number;
  title: string;
  description: string;
  isInProgress?: boolean;
}

const StyledText = styled(Text);

export const PostItem: React.FC<PostItemProps> = ({
  photo,
  name,
  rating,
  title,
  description,
  isInProgress = false,
}) => {
  return (
    <ScrollView className="w-full border-black border-t-[1px] py-4">
      <View className="px-8">
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center space-x-2">
            <Image
              className="w-12 h-12 rounded-full"
              source={{
                uri: photo,
              }}
            />
            <View className="flex flex-col">
              <Text className="font-medium">{name}</Text>
            </View>
          </View>
          {!isInProgress ? (
            <RatingIcons rating={rating} />
          ) : (
            <View className="flex flex-row items-center">
              <Ionicons name="ellipsis-vertical" size={16} color="black" />
            </View>
          )}
        </View>
        <View className="flex flex-row mt-2">
          <View className="flex basis-2/5 h-10">
            <StyledText className="w-28" numberOfLines={2}>
              {title}
            </StyledText>
          </View>
          <StyledText className="flex basis-3/5" numberOfLines={2}>
            {description}
          </StyledText>
        </View>
        <Image
          className="w-full h-36 mt-2"
          source={{
            uri: photo,
          }}
        />
        {!isInProgress && (
          <View className="flex flex-row justify-evenly mt-2">
            <View className="flex flex-row space-x-2 items-center">
              <Ionicons name="thumbs-up-sharp" size={16} color="black" />
              <Text className="text-xs">Like</Text>
            </View>
            <View className="flex flex-row space-x-2 items-center">
              <Ionicons name="chatbox-sharp" size={16} color="black" />
              <Text className="text-xs">Comentar</Text>
            </View>
            <View className="flex flex-row space-x-1 items-center">
              <Ionicons name="arrow-redo-sharp" size={16} color="black" />
              <Text className="text-xs">Compartir</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
