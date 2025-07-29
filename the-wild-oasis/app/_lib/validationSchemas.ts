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

export const searchParamsSchema = z.object({
  capacity: z.enum(["small", "medium", "large", "all"]).optional(),
});

export const BookingSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numNights: z.number(),
  numGuests: z.number(),
  cabinPrice: z.number(),
  extrasPrice: z.number(),
  totalPrice: z.number(),
  status: z.string(),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
  observations: z.string().nullable(),
  cabinId: z.number(),
  guestId: z.number(),
});

export const BookingArraySchema = z.array(BookingSchema);

export type Booking = z.infer<typeof BookingSchema>;

export const SettingsSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  minBookingLength: z.number(),
  maxBookingLength: z.number(),
  maxGuestPerBooking: z.number(),
  breakfastPrice: z.number(),
});

export type Settings = z.infer<typeof SettingsSchema>;

export const BookingsPerGuestSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numNights: z.number(),
  numGuests: z.number(),
  totalPrice: z.number(),
  cabinId: z.number(),
  guestId: z.number(),
  cabins: z.object({
    name: z.string(),
    image: z.string(),
  }),
});

export const BookingsPerGuestArray = z.array(BookingsPerGuestSchema);

export type BookingsPerGuest = z.infer<typeof BookingsPerGuestSchema>;
