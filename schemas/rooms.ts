import { z } from "zod";

export const roomSchema = z.object({
  role: z.union([z.literal("owner"), z.literal("editor")]),
  userId: z.string().email(),
  roomId: z.string(),
  createdAt: z.string().datetime(),
});
