"use server";

import { adminDb } from "@/firebase-admin";
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
