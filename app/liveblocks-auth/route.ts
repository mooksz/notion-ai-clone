import { adminDb } from "@/firebase-admin";
import liveblocks from "@/liveblocks";
import { clerckSessionClaimsSchema } from "@/schemas/users";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  const parsedSessionClaims =
    clerckSessionClaimsSchema.safeParse(sessionClaims);

  if (!parsedSessionClaims.success) {
    return NextResponse.json(
      {
        error: "Invalid session claims",
        details: parsedSessionClaims.error.errors,
      },
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const session = liveblocks.prepareSession(parsedSessionClaims.data.email, {
    userInfo: {
      avatar: parsedSessionClaims.data.image,
      email: parsedSessionClaims.data.email,
      name: parsedSessionClaims.data.fullName,
    },
  });

  /** Issues? 2:45:00 */
  const roomRef = adminDb.doc(
    `users/${parsedSessionClaims.data.email}/rooms/${room}`
  );

  const roomDoc = await roomRef.get();

  if (!roomDoc.exists) {
    return NextResponse.json(
      {
        error: "User not in room",
      },
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
