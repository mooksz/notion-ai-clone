import { RoomProvider } from "@/providers/liveblocks/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export async function PageLayout(props: PageLayoutProps) {
  auth.protect();

  const { children, params } = props;
  const { id } = await params;

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default PageLayout;
