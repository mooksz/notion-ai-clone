"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { FC, FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { CollaborativeEditor } from "../CollaborativeEditor/CollaborativeEditor";
import { useDocumentOwner } from "@/hooks/useDocumentOwner";
import { DeleteDocumentButton } from "@/components/molecules/DeleteDocumentButton/DeleteDocumentButton";
import { usePrepareFirebaseAuth } from "@/hooks/usePrepareFirebaseAuth";
import { InviteUsersToDocument } from "@/components/molecules/InviteUsersToDocument/InviteUsersToDocument";
import { ManageDocumentUsers } from "@/components/molecules/ManageDocumentUsers/ManageDocumentUsers";

type DocumentProps = {
  id: string;
};

export const Document: FC<DocumentProps> = (props) => {
  const { id } = props;
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [titleInputValue, setTitleInputValue] = useState("");
  const [isUpdatingTitle, startTitleUpdate] = useTransition();
  const { isOwner } = useDocumentOwner();
  usePrepareFirebaseAuth();

  useEffect(() => {
    if (!data) {
      return;
    }

    setTitleInputValue(data.title);
  }, [data]);

  function onSubmitUpdateTitleForm(e: FormEvent) {
    e.preventDefault();

    if (!titleInputValue.trim()) return;

    startTitleUpdate(async () => {
      await updateDoc(doc(db, "documents", id), {
        title: titleInputValue,
      });
    });
  }

  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="max-w-6xl mx-auto pb-5 flex flex-wrap gap-2">
        {/* Update title */}
        <form
          className="flex flex-1 space-x-2"
          onSubmit={onSubmitUpdateTitleForm}
        >
          <Input
            value={titleInputValue}
            onChange={(e) => setTitleInputValue(e.target.value)}
          />

          <Button disabled={isUpdatingTitle} type="submit">
            {isUpdatingTitle ? "Updating" : "Update"}
          </Button>
        </form>

        {/** CRUD actions if isOwner */}
        {isOwner && (
          <div className="flex gap-2 w-full justify-end">
            <InviteUsersToDocument />
            <DeleteDocumentButton />
          </div>
        )}
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        {/*  Manage users*/}
        {isOwner && <ManageDocumentUsers />}

        {/* Avatars */}
      </div>

      <hr className="pb-10" />

      <CollaborativeEditor />
    </div>
  );
};
