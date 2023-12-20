import { z } from "zod";

export const storageCreateFormSchema = z.object({
  name: z.string().min(2, {
    message: "Storage must be at least 4 characters.",
  }),
});

