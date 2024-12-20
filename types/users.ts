import { z } from "zod";
import { clerckSessionClaimsSchema } from "@/schemas/users";

export type ClerckSessionClaims = z.infer<typeof clerckSessionClaimsSchema>;
