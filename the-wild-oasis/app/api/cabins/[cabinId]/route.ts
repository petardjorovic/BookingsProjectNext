import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

type GetProps = {
  params: Promise<{
    cabinId: string;
  }>;
};

export async function GET(request: Request, { params }: GetProps) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
