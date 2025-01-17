import { signInWithCustomToken } from "firebase/auth";
import { useAuth } from "@clerk/nextjs";
import { firebaseAuth } from "@/firebase";

export async function usePrepareFirebaseAuth() {
  const { getToken } = useAuth();

  if (firebaseAuth.currentUser) return;

  // Get the Clerk token
  const clerkToken = await getToken({ template: "integration_firebase" });

  if (!clerkToken) {
    throw new Error("User is not authenticated with Clerk.");
  }

  await signInWithCustomToken(firebaseAuth, clerkToken);
}
