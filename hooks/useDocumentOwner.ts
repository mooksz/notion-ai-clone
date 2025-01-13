import { db } from "@/firebase";
import { roomSchema } from "@/schemas/rooms";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

export function useDocumentOwner() {
  const { user } = useUser();
  const liveblocksRoom = useRoom();
  const roomRef = doc(
    db,
    `users/${user?.emailAddresses[0].toString()}/rooms/${liveblocksRoom.id}`
  );

  const [document, loading, error] = useDocument(user && roomRef);

  const parsedRoom = roomSchema.safeParse(document?.data());

  return {
    isOwner: parsedRoom.data?.role === "owner" ? true : false,
    loading,
    error: error || parsedRoom.error,
  };
}
