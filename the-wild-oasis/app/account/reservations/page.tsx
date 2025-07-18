import ReservationCard from "@/app/_components/ReservationCard";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reservations",
};

export default function Page() {
  // CHANGE
  const bookings: {
    id: number;
    guestId: number;
    startDate: string;
    endDate: string;
    numNights: number;
    totalPrice: number;
    numGuests: number;
    status: string;
    created_at: string;
    cabins: { name: string; image: string };
  }[] = [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
