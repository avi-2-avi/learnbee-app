import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadUserProfilePicture = async (
  uid: string,
  imageUri: string,
) => {
  if (!imageUri) return null;

  const response = await fetch(imageUri);
  const blob = await response.blob();

  const storageRef = ref(storage, `users/${uid}/profile.jpg`);
  await uploadBytes(storageRef, blob);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const updateUserData = async (
  uid: string,
  description: string,
  photoURL?: string | null,
) => {
  const updateData: any = { description };
  if (photoURL) {
    updateData.photo = photoURL;
  }

  try {
    await updateDoc(doc(db, "users", uid), updateData);
  } catch (error) {
    console.error("Error updating description: ", error);
    throw error;
  }
};
