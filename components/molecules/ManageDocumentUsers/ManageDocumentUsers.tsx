"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useState, useTransition, type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRoom } from "@liveblocks/react/suspense";
import { useUser } from "@clerk/nextjs";
import { useDocumentOwner } from "@/hooks/useDocumentOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { query, collectionGroup, where } from "firebase/firestore";
import { toast } from "sonner";
import { removeUserFromDocument } from "@/actions/documents";

type ManageDocumentUsersProps = {};

export const ManageDocumentUsers: FC<ManageDocumentUsersProps> = (props) => {
  const {} = props;
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const room = useRoom();

  const [rooms] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  if (!user) return null;

  const currentUsersEmail = user.emailAddresses[0].toString();
  const filteredRooms = rooms?.docs.filter(
    (room) => room.data().userId !== currentUsersEmail
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Users ({rooms?.size})</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with access</DialogTitle>
        </DialogHeader>

        <hr className="my-2" />

        <p className="font-semibold">Owner</p>
        <ManageDocumentUser userId={currentUsersEmail} prohibitDelete />

        {!!filteredRooms?.length && (
          <p className="font-semibold mt-2">Editors</p>
        )}
        {filteredRooms?.map((doc) => {
          const { userId } = doc.data();

          if (userId === currentUsersEmail) return null;

          return <ManageDocumentUser key={userId} userId={userId} />;
        })}
      </DialogContent>
    </Dialog>
  );
};

type ManageDocumentUserProps = {
  userId: string;
  prohibitDelete?: boolean;
};

const ManageDocumentUser: FC<ManageDocumentUserProps> = (props) => {
  const { userId, prohibitDelete } = props;
  const [isDeleting, startDeletingTransition] = useTransition();
  const room = useRoom();

  const onClickDeleteButton = () => {
    startDeletingTransition(async () => {
      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success(`${userId} removed from document`);
        return;
      }

      if (!success) {
        toast.error(`Failed in removing ${userId} from document`);
        return;
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <p className="font-light">{userId}</p>

      {!prohibitDelete && (
        <Button
          variant="destructive"
          onClick={onClickDeleteButton}
          disabled={isDeleting}
          size="sm"
        >
          {isDeleting ? "Removing..." : "Remove"}
        </Button>
      )}
    </div>
  );
};
