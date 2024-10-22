import { z } from "zod";

export const filterSchema = z.object({
  search: z.string().min(0),
  status: z.enum(status).optional(),
});

export type Params = z.infer<typeof filterSchema>;
export const Validator = validateRequestPayload(filterSchema);
