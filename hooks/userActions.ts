import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export type User = {
  id: string;
  name: string;
  photo: string;
};

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

export const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data() as Omit<User, "id">;
      return { id: userId, ...userData };
    }
    return null;
  } catch (e) {
    console.error("Error fetching user: ", e);
    throw e;
  }
};
