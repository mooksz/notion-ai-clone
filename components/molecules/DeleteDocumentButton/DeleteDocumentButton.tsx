"use client";

import { Button } from "@/components/atoms/Button/Button";
import {
  useActionState,
  useEffect,
  useState,
  useTransition,
  type FC,
} from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRoom } from "@liveblocks/react/suspense";
import { deleteDocument } from "@/actions/documents";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteDocumentButtonProps = {};

export const DeleteDocumentButton: FC<DeleteDocumentButtonProps> = (props) => {
  const {} = props;
  const [isOpen, setIsOpen] = useState(false);
  const room = useRoom();
  const [isDeleting, startDeletingTransition] = useTransition();
  const router = useRouter();

  function onClickDeleteButton() {
    if (!room.id) return;

    startDeletingTransition(async () => {
      const { success } = await deleteDocument(room.id);

      if (success) {
        setIsOpen(false);
        router.push("/");
        toast.success("Document deleted successfully!");
        return;
      }

      if (!success) {
        toast.error("Failed to delete document");
      }
    });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="destructive">
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete the document?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the document, including all its
            contents, and revoke access for all users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={onClickDeleteButton}
            type="submit"
            variant="destructive"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
