"use client";

import { useOptimistic } from "react";
import { BookingsPerGuest } from "../_lib/validationSchemas";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

export default function ReservationList({
  bookings,
}: {
  bookings: BookingsPerGuest[];
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings, bookingId: number) => {
      return currBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
