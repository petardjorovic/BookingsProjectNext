import { z } from "zod";

export const CabinPreviewSchema = z.object({
  id: z.number(),
  name: z.string(),
  maxCapacity: z.number(),
  regularPrice: z.number(),
  discount: z.number(),
  image: z.string(),
});

export const CabinPreviewArraySchema = z.array(CabinPreviewSchema);

export type CabinPreview = z.infer<typeof CabinPreviewSchema>;

export const FullCabinPreviewSchema = z.object({
  id: z.number(),
  name: z.string(),
  maxCapacity: z.number(),
  regularPrice: z.number(),
  discount: z.number(),
  image: z.string(),
  created_at: z.string(),
  description: z.string(),
});

export type FullCabin = z.infer<typeof FullCabinPreviewSchema>;
