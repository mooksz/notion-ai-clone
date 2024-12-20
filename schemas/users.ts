import { z } from "zod";

export const clerckSessionClaimsSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  image: z.string().url(),
});
