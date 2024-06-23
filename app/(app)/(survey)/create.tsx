import { AppBarBack } from "@/components/common/AppBarBack";
import { CustomButton } from "@/components/common/CustomButton";
import { projects } from "@/test/projects";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  StyleSheet
} from "react-native";

export default function Create() {
  const [numStudents, setNumStudents] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<string | undefined>(
    undefined,
  );
  const [showQR, setShowQR] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handlePublish = () => {
    router.replace("(app)");
  };

  const handleAddNumStudents = () => {
    setNumStudents(numStudents + 1);
  };

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
  };

  useEffect(() => {
    if (selectedProject && isModalVisible === false) {
      setShowQR(true);
    }
  }, [isModalVisible]);

  return (
    <View className="w-full h-full bg-white">
      <AppBarBack />
      <View className="flex flex-col w-[80%] mx-auto pt-6">
        <Text className="font-medium text-lg mb-2">Encuesta estudiantil</Text>
        <Text>Realiza una encuesta para evaluar como le fue al proyecto</Text>
        <Text className="font-medium text-lg mt-2">Proyecto</Text>
        <TouchableOpacity
          className="w-full"
          onPress={handleOpenModal}
          activeOpacity={1}
        >
          <TextInput
            className="w-full p-4 border-yellow rounded-lg mb-3 mt-3"
            placeholder="Selecciona el proyecto"
            style={styles.input}
            value={selectedProject ? selectedProject : ""}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        {showQR && (
          <View className="w-full items-center mt-10">
            <Text className="font-medium mb-2">
              ¡Conéctate con este código QR!
            </Text>
            <Text>Usa tu celular para escanearlo</Text>
            <Image
              className="mt-2 mb-6"
              source={require("@/assets/images/qr-code.png")}
            />
            <View className="flex flex-row items-center mb-10">
              <Text className="font-medium mb-2">Encuesta realizada por </Text>
              <TouchableOpacity
                onPress={handleAddNumStudents}
                className="p-2 border-yellow rounded-lg ml-1 mr-1"
                style={styles.input}
              >
                <Text>{numStudents} estudiantes</Text>
              </TouchableOpacity>
              <Ionicons name="list" size={24} color="black" />
            </View>
            <View className="w-full items-end">
              <CustomButton
                onPress={handlePublish}
                title="Publicar"
                className="w-1/2"
              ></CustomButton>
            </View>
          </View>
        )}
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-3/4 bg-white rounded-lg p-6">
            <Text className="text-lg font-medium mb-4">
              Seleccione un curso
            </Text>
            <Picker
              selectedValue={selectedProject}
              onValueChange={(itemValue) => handleProjectSelect(itemValue)}
            >
              {projects.map((project) => (
                <Picker.Item
                  key={project.id}
                  label={project.title}
                  value={project.title}
                />
              ))}
            </Picker>
            <CustomButton
              onPress={handleCloseModal}
              title="Cerrar"
              type="primary"
              className="mt-4 w-2/3 mx-auto"
            ></CustomButton>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#F9CD14",
    borderWidth: 1,
    borderRadius: 10,
  },
});