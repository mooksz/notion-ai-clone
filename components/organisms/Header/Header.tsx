"use client";

import { Breadcrumbs } from "@/components/molecules/Breadcrumbs/Breadcrumbs";
import { firebaseAuth } from "@/firebase";
import { SignedIn, SignInButton, UserButton } from "@clerk/clerk-react";
import { SignedOut, useUser } from "@clerk/nextjs";
import { FC, useEffect } from "react";

type HeaderProps = {};

export const Header: FC<HeaderProps> = (props) => {
  const {} = props;
  const { user } = useUser();

  useEffect(() => {
    if (user) return;

    /** If there is no user object we should sign out of firebase */
    firebaseAuth.signOut();
  }, [user]);

  return (
    <header className="flex items-center justify-between p-5">
      {user && <h1 className="text-2xl">{user?.firstName}'s Space</h1>}

      <Breadcrumbs />

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
