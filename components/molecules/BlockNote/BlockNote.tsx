"use client";

import { FC, useRef } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useSelf } from "@liveblocks/react/suspense";
import { stringToLightColor } from "@/lib/stringToLightColor";

type BlockNoteProps = {
  document: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};

export const BlockNote: FC<BlockNoteProps> = (props) => {
  const { document, provider, darkMode } = props;
  const userInfo = useSelf((me) => me.info);
  const viewRef = useRef<HTMLDivElement>(null);

  const editor: BlockNoteEditor = useCreateBlockNote({
    domAttributes: {
      blockContent: {
        "data-is-empty-and-focused": "true",
      },
    },
    collaboration: {
      provider,
      fragment: document.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringToLightColor(userInfo?.email),
      },
    },
  });

  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView
        ref={viewRef}
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
        onChange={() => {
          /** WOULD DO: Save to DB */
          console.log(editor.document);
        }}
      />
    </div>
  );
};
