"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { stringToLightColor } from "@/lib/stringToLightColor";
import { cn } from "@/lib/cn";

type LiveCursorProps = {
  userInfo: Liveblocks["UserMeta"]["info"];
  cursor: { x: number; y: number };
};

export const LiveCursor: FC<LiveCursorProps> = (props) => {
  const { userInfo, cursor } = props;

  const color = stringToLightColor(userInfo.email || "1");

  return (
    <motion.div
      style={{ top: cursor.y, left: cursor.x }}
      className="absolute z-50 pointer-events-none"
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 16 16"
        className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[10px] stroke-[${color}]`}
        height="1.5rem"
        width="1.5rem"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>

      {(userInfo.name || userInfo.email) && (
        <div
          className={cn("py-1 px-2 font-semibold text-sm rounded-full")}
          style={{ backgroundColor: color }}
        >
          {userInfo.name || userInfo.email}
        </div>
      )}
    </motion.div>
  );
};
