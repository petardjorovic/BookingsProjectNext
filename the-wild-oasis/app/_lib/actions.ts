"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabaseClient";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { NewBookingSchema } from "./validationSchemas";

export async function singInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function createBooking(
  bookingData: {
    startDate: string;
    endDate: string;
    numNights: number;
    cabinPrice: number;
    cabinId: number;
  },
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");
  if (!session.user.guestId) throw new Error("You must be logged in.");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.toString().slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const parsed = NewBookingSchema.safeParse(newBooking);

  if (!parsed.success) {
    console.error(parsed.error);
    const errorMessages = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new Error(`Booking validation failed: ${errorMessages}`);
  }

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateBooking(formData: FormData) {
  // 1) Authentiction
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");
  if (!session.user.guestId) throw new Error("You must be logged in.");

  // 2) Authorization
  const bookingId = formData.get("bookingId")?.toString();
  if (!bookingId) throw new Error("There are not reservation with this id");

  // 3) Building update data
  const numGuests = formData.get("numGuests")?.toString()
    ? Number(formData.get("numGuests")?.toString())
    : undefined;
  const observations = formData.get("observations")?.toString().slice(0, 1000);
  const updatedData = { numGuests, observations };

  const guestBookings = await getBookings(session.user.guestId);
  const bookingsIds = guestBookings.map((booking) => booking.id);

  if (!bookingsIds.includes(Number(bookingId)))
    throw new Error("You are not allowed to update this reservation.");

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", Number(bookingId))
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");
  if (!session.user.guestId) throw new Error("You must be logged in.");

  const guestBookings = await getBookings(session.user.guestId);
  const bookingsIds = guestBookings.map((booking) => booking.id);

  if (!bookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const nationalID = formData.get("nationalID")?.toString();
  const fullNation = formData.get("nationality");
  const [nationality, countryFlag] = fullNation
    ? fullNation.toString().split("%")
    : ["", ""];

  if (!nationalID || !/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  if (session.user.guestId === undefined)
    throw new Error("You must be logged in.");

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}
