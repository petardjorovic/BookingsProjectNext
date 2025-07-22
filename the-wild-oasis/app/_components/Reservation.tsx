import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { FullCabin } from "../_lib/validationSchemas";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }: { cabin: FullCabin }) {
  const [bookedDates, settings] = await Promise.all([
    await getBookedDatesByCabinId(cabin.id),
    await getSettings(),
  ]);

  return (
    <div className="grid grid-cols-5 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
