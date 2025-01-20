"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { FC } from "react";
import { getNameInitials } from "@/lib/getNameInitials";

type UsersCurrentlyInDocumentProps = {};

export const UsersCurrentlyInDocument: FC<UsersCurrentlyInDocumentProps> = (
  props
) => {
  const {} = props;
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];

  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm">Users currently editing this page:</p>
      <div className="flex -space-x-5">
        {all.map((person) => {
          const { name, avatar, email } = person.info;

          return (
            <TooltipProvider key={person.id}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="border-2 hover:z-50">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{getNameInitials(name)}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};
