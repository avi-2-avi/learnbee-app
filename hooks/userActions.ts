import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateUserDescription = async (
  uid: string,
  description: string,
) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      description,
    });
  } catch (error) {
    console.error("Error updating description: ", error);
    throw error;
  }
};
