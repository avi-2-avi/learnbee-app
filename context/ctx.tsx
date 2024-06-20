import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Define the AuthContext type
type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  // if (process.env.NODE_ENV !== "production") {
  //   if (!value) {
  //     throw new Error("useSession must be wrapped in a <SessionProvider />");
  //   }
  // }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

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
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
              console.log(errorCode);
              setSession(null);
            });
        },
        signOut: async () => {
          await auth.signOut();
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
