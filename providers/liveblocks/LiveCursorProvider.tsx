"use client";

import { LiveCursor } from "@/components/molecules/LiveCursor/LiveCursor";
import { useUpdateMyPresence } from "@liveblocks/react/suspense";
import { useOthers } from "@liveblocks/react/suspense";
import type { FC, ReactNode, PointerEvent } from "react";

type LiveCursorProviderProps = {
  children: ReactNode;
};

export const LiveCursorProvider: FC<LiveCursorProviderProps> = (props) => {
  const { children } = props;
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };

    updateMyPresence({ cursor });
  };

  const onPointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  return (
    <div onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {others.map((person) => {
        const { presence, connectionId, info } = person;

        if (presence.cursor === null) return null;

        return (
          <LiveCursor
            key={connectionId}
            userInfo={info}
            cursor={presence.cursor}
          />
        );
      })}

      {children}
    </div>
  );
};
