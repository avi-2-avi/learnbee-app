import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUserId } from "./userUserId";

type UserData = {
  name: string;
  description: string;
  photo: string;
};

export function useUserData() {
  const uid = useUserId();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [uid]);

  return { userData, loading };
}
