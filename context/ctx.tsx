import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";

// Define the AuthContext type
type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  register: (
    name: string,
    email: string,
    birthDate: Date,
    password: string,
  ) => void;
  session?: string | null;
  uid?: string | null;
  isLoading: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  register: () => null,
  uid: null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[, uid], setUid] = useStorageState("uid");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              // Signed in
              const user = userCredential.user;
              const token = await user.getIdToken();
              setSession(token);
              setUid(user.uid);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
              console.log(errorCode);
              setSession(null);
              setUid(null);
            });
        },
        signOut: async () => {
          await firebaseSignOut(auth)
            .then(() => {
              setSession(null);
              setUid(null);
            })
            .catch((error) => {
              console.error("Sign out error", error);
            });
        },
        register: async (
          name: string,
          email: string,
          birthDate: Date,
          password: string,
        ) => {
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password,
            );
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
              name,
              email,
              birthDate: birthDate.toISOString(), // Storing as ISO string
              description: "",
              photo:
                "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png",
            });
            const token = await user.getIdToken();
            setSession(token);
            setUid(user.uid);
          } catch (error) {
            console.error("Registration error", error);
          }
        },
        uid,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
