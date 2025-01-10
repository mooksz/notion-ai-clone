"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NewDocumentButton } from "@/components/molecules/NewDocumentButton/NewDocumentButton";
import { useEffect, useState, type FC } from "react";
import { MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { SidebarOption } from "./SidebarOption";

type SidebarProps = {};

type RoomDocument = {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
} & DocumentData;

export const Sidebar: FC<SidebarProps> = (props) => {
  const {} = props;
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({ owner: [], editor: [] });
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].emailAddress)
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({ id: curr.id, ...roomData });
        } else {
          acc.editor.push({ id: curr.id, ...roomData });
        }

        return acc;
      },
      { owner: [], editor: [] }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />

      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {/* My Document */}
        {groupedData.owner.length === 0 ? (
          <p className="text-gray-500 font-semibold text-sm">
            No documents found
          </p>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">
              My documents
            </h2>
            {groupedData.owner.map((doc) => {
              return (
                <SidebarOption
                  key={doc.id}
                  id={doc.id}
                  href={`/documents/${doc.id}`}
                />
              );
            })}
          </>
        )}
      </div>

      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {/* Shared with me */}
        {groupedData.owner.length === 0 ? (
          <p className="text-gray-500 font-semibold text-sm">
            No documents found
          </p>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">
              Shared with me
            </h2>
            {groupedData.editor.map((doc) => {
              return (
                <SidebarOption
                  key={doc.id}
                  id={doc.id}
                  href={`/documents/${doc.id}`}
                />
              );
            })}
          </>
        )}
      </div>
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
