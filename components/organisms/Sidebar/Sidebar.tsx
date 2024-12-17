import { NewDocumentButton } from "@/components/molecules/NewDocumentButton/NewDocumentButton";
import type { FC } from "react";

type SidebarProps = {};

export const Sidebar: FC<SidebarProps> = (props) => {
  const {} = props;

  return (
    <div>
      <NewDocumentButton />
    </div>
  );
};
