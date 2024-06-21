import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { router } from "expo-router";

export const OptionsButton = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleGoToPostCreation = () => {
    router.navigate("(post)/create");
    setMenuVisible(false);
  };

  const handleGoToSurveyCreation = () => {
    router.navigate("(survey)/create");
    setMenuVisible(false);
  };

  return (
    <View className="absolute bottom-36 right-4">
      <TouchableOpacity
        className="bg-yellow w-16 h-16 rounded-full justify-center items-center"
        onPress={() => setMenuVisible(true)}
      >
        <Text className="font-thin text-6xl">+</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
          className="flex-1 bg-black/30 justify-end"
        >
          <View className="absolute right-4 bottom-28 bg-white px-5 py-2 w-1/2 rounded-lg">
            <TouchableOpacity
              onPress={handleGoToPostCreation}
              className="w-full border-b py-3"
            >
              <Text>Crear proyecto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoToSurveyCreation}
              className="w-full py-3"
            >
              <Text>Crear encuesta</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
