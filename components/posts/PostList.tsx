import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import { fetchProjects, Project } from "@/hooks/projectActions"; // Ensure the path is correct
import { useUserId } from "@/hooks/userUserId";

interface PostListProps {
  useFullScreenHeight?: boolean;
  isInProgress?: boolean;
  fromUser?: boolean;
}

export const PostList: React.FC<PostListProps> = ({
  useFullScreenHeight = false,
  isInProgress = false,
  fromUser = false,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useUserId() ?? undefined;

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects(
          isInProgress,
          fromUser,
          userId,
        );
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error loading projects: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [isInProgress]);

  const height = useFullScreenHeight ? "h-full" : "mb-56";

  if (loading) {
    return (
      <View className={`bg-white w-full h-full items-center justify-center`}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View className={`bg-white w-full flex flex-col mt-2 ${height}`}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <PostItem
            isInProgress={isInProgress}
            photo={item.imageUri!}
            userPhoto={item.userImage!}
            name={item.userName!}
            rating={item.rating}
            title={item.topic}
            description={item.description}
          />
        )}
      />
    </View>
  );
};
