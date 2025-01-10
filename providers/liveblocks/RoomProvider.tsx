"use client";

import type { FC, ReactNode } from "react";
import {
  ClientSideSuspense,
  RoomProvider as LibRoomProvider,
} from "@liveblocks/react/suspense";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { LiveCursorProvider } from "./LiveCursorProvider";

type RoomProviderProps = {
  children: ReactNode;
  roomId: string;
};

export const RoomProvider: FC<RoomProviderProps> = (props) => {
  const { children, roomId } = props;

  return (
    <LibRoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </LibRoomProvider>
  );
};
