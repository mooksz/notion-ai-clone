"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/liveblocks";
import { clerckSessionClaimsSchema } from "@/schemas/users";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  auth.protect();

  const { sessionClaims } = await auth();

  const parsedSessionClaims =
    clerckSessionClaimsSchema.safeParse(sessionClaims);

  if (!parsedSessionClaims.success) {
    return {
      errors: parsedSessionClaims.error,
      errorMessage: "Het is niet gelukt om een document aan te maken",
    };
  }

  try {
    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
      title: "New document",
    });

    await adminDb
      .collection("users")
      .doc(parsedSessionClaims.data.email)
      .collection("rooms")
      .doc(docRef.id)
      .set({
        userId: parsedSessionClaims.data.email,
        role: "owner",
        createdAt: new Date().toISOString(),
        roomId: docRef.id,
      });

    return { docId: docRef.id };
  } catch (error) {
    return {
      errors: ["Error querying database"],
      errorMessage: "Het is niet gelukt om een document aan te maken",
    };
  }
}

export async function deleteDocument(documentId: string) {
  auth.protect();

  console.log("Deleting document: ", documentId);

  try {
    // Delete document
    await adminDb.collection("documents").doc(documentId).delete();

    // Get all documents in users collection
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", documentId)
      .get();

    // Create multi write batch
    const batch = adminDb.batch();

    // Define delete instructions for every doc
    query.docs.forEach((doc) => batch.delete(doc.ref));

    // Commit the deletes
    await batch.commit();

    // Delete room from liveblocks
    await liveblocks.deleteRoom(documentId);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  auth.protect();

  /** WOULDDO: validate email and room id */
  console.log(`Inviting user ${email} to document ${roomId}`);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date().toISOString(),
        roomId,
      }); /** WOULDDO: type data */

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
