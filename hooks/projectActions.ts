import { db, storage } from "../firebaseConfig";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type Project = {
  name: string;
  description: string;
  topic: string;
  course: string;
  imageUri: string | null;
  rating: number | null;
  userId: string | null | undefined;
  numStudents: number | null;
};

const uploadImageToStorage = async (
  uri: string,
  projectId: string,
): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, `projects/${projectId}/image.jpg`);
  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const publishProject = async (project: Project) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      imageUri: null, // Placeholder for the image URL
    });
    console.log("Project published with ID: ", docRef.id);

    let imageUrl =
      "https://www.ntaskmanager.com/wp-content/uploads/2020/02/What-is-a-Project-1-scaled.jpg";

    if (project.imageUri) {
      imageUrl = await uploadImageToStorage(project.imageUri, docRef.id);
    }

    await updateDoc(doc(db, "projects", docRef.id), { imageUri: imageUrl });

    console.log("Project updated with image URL");
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const updateProject = async (
  projectId: string,
  numStudents: number,
  rating: number,
) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      numStudents,
      rating,
    });
    console.log("Project updated with new rating and number of students");
  } catch (e) {
    console.error("Error updating project: ", e);
    throw e;
  }
};
