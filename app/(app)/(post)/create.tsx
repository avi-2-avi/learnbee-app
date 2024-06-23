import { AppBarBack } from "@/components/common/AppBarBack";
import { CustomButton } from "@/components/common/CustomButton";
import { router } from "expo-router";
import { Key, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { courses } from "@/assets/constants/courses";
import { publishProject } from "@/hooks/projectActions";
import * as ImagePicker from "expo-image-picker";
import { useUserId } from "@/hooks/userUserId";

export default function Create() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState<string | undefined>("");
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(
    undefined,
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const uid = useUserId();

  const handleGoBack = () => {
    router.back();
  };

  const handleCreate = async () => {
    if (!name || !description || !selectedCourse || !topic) {
      Alert.alert("Error", "Todos los campos deben estar llenos.");
      return;
    }

    const project = {
      name,
      description,
      topic,
      course: selectedCourse!,
      imageUri,
      rating: null,
      user_id: uid,
    };
    try {
      await publishProject(project);
      Alert.alert("Enhorabuena", "Su proyecto a sido creado");
      router.navigate("(post)/survey");
    } catch (error) {
      Alert.alert("Error", "La creación de su proyecto no ha sido exitosa.");
    }
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
  };

  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Error", "Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Error", "Permission to access media library is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="w-full h-full bg-white">
      <AppBarBack />
      <View className="flex flex-1 items-center justify-start w-[80%] mx-auto pt-10">
        <Text className="w-full mb-1">Nombre</Text>
        <TextInput
          className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
          placeholder="¿Cómo se llama el proyecto?"
          onChangeText={(text) => setName(text)}
        />
        <Text className="w-full mb-1">Descripción</Text>
        <TextInput
          className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
          placeholder="¿De que se trata tu proyecto?"
          editable
          inputMode="text"
          multiline
          numberOfLines={4}
          maxLength={200}
          onChangeText={(text) => setDescription(text)}
        />
        <Text className="w-full mb-1">Curso</Text>
        <TouchableOpacity
          className="w-full"
          onPress={handleOpenModal}
          activeOpacity={1}
        >
          <TextInput
            className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
            placeholder="¿A qué curso pertenece?"
            value={
              selectedCourse
                ? courses.find((course) => course.value === selectedCourse)
                    ?.label
                : ""
            }
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <Text className="w-full mb-1">Tema</Text>
        <TextInput
          className="w-full p-4 border-yellow border-[1rem] rounded-lg mb-3"
          placeholder="¿Qué tema abarca tu curso?"
          onChangeText={(text) => setTopic(text)}
        />
        <Text className="w-full mb-3">Contenido multimedia</Text>
        <View className="w-full flex flex-row space-x-4 justify-start">
          <CustomButton
            onPress={takePicture}
            type="secondary"
            className="basis-20"
          >
            <Ionicons name="camera-outline" size={40} color="black" />
          </CustomButton>
          <CustomButton
            onPress={pickImage}
            type="secondary"
            className="basis-20"
          >
            <Ionicons name="image-sharp" size={40} color="black" />
          </CustomButton>
        </View>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100, marginBottom: 10 }}
            className="mt-4"
          />
        )}
        <View className="flex flex-row space-x-6 mt-8">
          <CustomButton
            onPress={handleGoBack}
            type="secondary"
            title="Cancelar"
            className="basis-1/2"
          ></CustomButton>
          <CustomButton
            onPress={handleCreate}
            title="Crear"
            className="basis-1/2"
          ></CustomButton>
        </View>
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
              selectedValue={selectedCourse}
              onValueChange={(itemValue) => handleCourseSelect(itemValue)}
            >
              {courses.map(
                (course: {
                  value: Key | null | undefined;
                  label: string | undefined;
                }) => (
                  <Picker.Item
                    key={course.value}
                    label={course.label}
                    value={course.value}
                  />
                ),
              )}
            </Picker>
            <CustomButton
              onPress={handleCloseModal}
              title="Seleccionar"
              type="primary"
              className="mt-4 w-2/3 mx-auto"
            ></CustomButton>
          </View>
        </View>
      </Modal>
    </View>
  );
}
