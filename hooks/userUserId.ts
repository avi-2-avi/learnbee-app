import { AuthContext } from "@/context/ctx";
import { useContext } from "react";

export function useUserId() {
  const { uid } = useContext(AuthContext);
  return uid;
}
