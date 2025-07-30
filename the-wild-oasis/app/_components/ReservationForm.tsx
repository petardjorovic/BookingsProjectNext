"use client";

import { User } from "next-auth";
import { FullCabin } from "../_lib/validationSchemas";
import { useReservation } from "../hooks/useReservation";
import { createBooking } from "../_lib/actions";
import { differenceInDays } from "date-fns";
import SubmitButton from "./SubmitButton";

type ReservationFormProps = {
  cabin: FullCabin;
  user: User;
};

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const startDate = range.from?.toISOString() || "";
  const endDate = range.to?.toISOString() || "";
  const numNights = differenceInDays(endDate, startDate);
  const { maxCapacity, regularPrice, discount, id: cabinId } = cabin;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="col-span-2 scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-10 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user?.image || ""}
            alt={user?.name || "user-avatar"}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-10 text-lg flex gap-5 flex-col"
        action={async (formData: FormData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(range.from && range.to) ? (
            <p className="text-primary-300 text-base px-8 py-4">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
