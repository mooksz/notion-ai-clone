"use client";

import type { FC, ReactNode } from "react";
import { LiveblocksProvider as LiveblocksLibProvider } from "@liveblocks/react/suspense";

type LiveblocksProviderProps = {
  children: ReactNode;
};

export const LiveblocksProvider: FC<LiveblocksProviderProps> = (props) => {
  const { children } = props;

  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_LIVELBOCKS_PUBLIC_KEY is not defined");
  }

  return (
    <LiveblocksLibProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksLibProvider>
  );
};
