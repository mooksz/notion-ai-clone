"use client";

import { Button } from "@/components/atoms/Button/Button";
import { FormEvent, useState, useTransition, type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRoom } from "@liveblocks/react/suspense";
import { deleteDocument, inviteUserToDocument } from "@/actions/documents";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

type InviteUsersToDocumentProps = {};

export const InviteUsersToDocument: FC<InviteUsersToDocumentProps> = (
  props
) => {
  const {} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const room = useRoom();
  const [isInviting, startInviteTransition] = useTransition();
  const router = useRouter();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!room) return;

    startInviteTransition(async () => {
      const { success } = await inviteUserToDocument(room.id, email);

      if (success) {
        setIsOpen(false);
        toast.success(`${email} successfully added to the room!`);
        setEmail("");
        return;
      }

      if (!success) {
        toast.error("Failed to add user to the room");
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a user to collaborate!</DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>

        <form className="flex gap-2" onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" disabled={!email || isInviting}>
            {isInviting ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
