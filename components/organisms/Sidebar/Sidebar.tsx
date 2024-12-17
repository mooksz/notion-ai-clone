import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/atoms/Button/Button";
import { NewDocumentButton } from "@/components/molecules/NewDocumentButton/NewDocumentButton";
import type { FC } from "react";
import { MenuIcon } from "lucide-react";

type SidebarProps = {};

export const Sidebar: FC<SidebarProps> = (props) => {
  const {} = props;

  const menuOptions = (
    <>
      <NewDocumentButton />

      {/* My Document */}
      {/* List... */}

      {/* Shared with me */}
      {/* List... */}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
};
