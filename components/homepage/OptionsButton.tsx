import { useSession } from "../../context/ctx";
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

export const OptionsButton = () => {
  const { signOut } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSignOut = () => {
    signOut();
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
              onPress={() => setMenuVisible(false)}
              className="w-full border-b py-3"
            >
              <Text>Crear proyecto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMenuVisible(false)}
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
