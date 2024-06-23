import { db, storage } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fetchUserById } from "./userActions";

export type Project = {
  id?: string;
  name: string;
  description: string;
  topic: string;
  course: string;
  imageUri: string | null;
  rating: number | null;
  userId: string | null | undefined;
  numStudents: number | null;
  userImage?: string;
  userName?: string;
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

export const publishProject = async (
  userId: string,
  projectData: Project,
): Promise<string> => {
  try {
    const user = await fetchUserById(userId);
    if (!user) throw new Error("User not found");

    const project = {
      ...projectData,
      userId,
    };

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

export const fetchProjects = async (
  isInProgress: boolean,
  fromUser: boolean,
  userId?: string,
): Promise<Project[]> => {
  try {
    const projectsCollection = collection(db, "projects");
    let q;

    console.log(
      `isInProgress: ${isInProgress}, fromUser: ${fromUser}, userId: ${userId}`,
    );

    if (isInProgress && fromUser && userId) {
      q = query(
        projectsCollection,
        where("rating", "==", null),
        where("userId", "==", userId),
      );
      console.log("Query: isInProgress && fromUser && userId");
    } else if (isInProgress) {
      q = query(projectsCollection, where("rating", "==", null));
      console.log("Query: isInProgress");
    } else if (fromUser && userId) {
      q = query(
        projectsCollection,
        where("rating", "!=", null),
        where("userId", "==", userId),
      );
      console.log("Query: fromUser && userId");
    } else {
      q = query(projectsCollection, where("rating", "!=", null));
      console.log("Query: default");
    }

    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Project, "id">),
    }));

    // Fetch user details for each project
    const projectsWithUserDetails = await Promise.all(
      projects.map(async (project) => {
        const user = await fetchUserById(project.userId!);
        return {
          ...project,
          userName: user?.name,
          userImage: user?.photo,
        };
      }),
    );

    return projectsWithUserDetails;
  } catch (e) {
    console.error("Error fetching projects: ", e);
    throw e;
  }
};
