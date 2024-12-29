import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';

export async function GET(request, { params }) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ status: 404, message: 'Cabin not found' });
  }
}