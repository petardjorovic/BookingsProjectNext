import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { FullCabin } from "../_lib/validationSchemas";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }: { cabin: FullCabin }) {
  const [bookedDates, settings] = await Promise.all([
    await getBookedDatesByCabinId(cabin.id),
    await getSettings(),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-5 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <div className="grid col-span-2">
          <LoginMessage />
        </div>
      )}
    </div>
  );
}
