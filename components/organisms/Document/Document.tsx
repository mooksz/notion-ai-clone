"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { FC, FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { CollaborativeEditor } from "../CollaborativeEditor/CollaborativeEditor";

type DocumentProps = {
  id: string;
};

export const Document: FC<DocumentProps> = (props) => {
  const { id } = props;
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [titleInputValue, setTitleInputValue] = useState("");
  const [isUpdatingTitle, startTitleUpdate] = useTransition();

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
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
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
          {/** If isOnwer && InivteUser, DeleteDocument */}
        </form>
      </div>

      <div>
        {/*  Manage users*/}

        {/* Avatars */}
      </div>

      <hr className="pb-10" />

      <CollaborativeEditor />
    </div>
  );
};
