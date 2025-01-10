"use client";

import { useRoom } from "@liveblocks/react";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { cn } from "@/lib/cn";
import { BlockNote } from "@/components/molecules/BlockNote/BlockNote";

export const CollaborativeEditor = () => {
  const room = useRoom();
  const [document, setDocument] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const yDocument = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDocument);
    setDocument(yDocument);
    setProvider(yProvider);

    return () => {
      yDocument?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!document || !provider) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex item-center gap-2 justify-end mb-10">
        {/** TranslateDocument AI */}
        {/** ChatToDocument AI */}

        {/** DarkMode AI */}
        <Button
          className={cn(
            darkMode
              ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
              : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
          )}
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/** BlockNote */}
      <BlockNote document={document} provider={provider} darkMode={darkMode} />
    </div>
  );
};
