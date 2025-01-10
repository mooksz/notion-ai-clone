"use client";

import { createNewDocument } from "@/actions/documents";
import { Button } from "@/components/atoms/Button/Button";
import { useRouter } from "next/navigation";
import { FC, useId, useState } from "react";
import { useTransition } from "react";

type NewDocumentButtonProps = {};

export const NewDocumentButton: FC<NewDocumentButtonProps> = (props) => {
  const {} = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const id = useId();

  const onClickButton = () => {
    startTransition(async () => {
      setErrorMessage("");

      const { docId, errorMessage } = await createNewDocument();

      if (errorMessage) {
        setErrorMessage(errorMessage);
        return;
      }

      router.push(`/documents/${docId}`);
    });
  };

  return (
    <>
      <Button
        aria-describedby={id}
        onClick={onClickButton}
        disabled={isPending}
      >
        {isPending ? "Creating..." : "New document"}
      </Button>

      <div id={id} aria-live="assertive" role="alert">
        {errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </>
  );
};
