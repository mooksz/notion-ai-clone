import { LiveblocksProvider } from "@/providers/liveblocks/LiveblocksProvider";
import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

function PageLayout(props: PageLayoutProps) {
  const { children } = props;

  return <LiveblocksProvider>{children}</LiveblocksProvider>;
}

export default PageLayout;
