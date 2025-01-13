import { roomSchema } from "@/schemas/rooms";
import { z } from "zod";

export type Room = z.infer<typeof roomSchema>;
