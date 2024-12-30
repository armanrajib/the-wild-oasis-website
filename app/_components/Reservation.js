import DateSelector from '@/app/_components/DateSelector';
import ReservationForm from '@/app/_components/ReservationForm';
import LoginMessage from '@/app/_components/LoginMessage';
import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';

export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="flex flex-col gap-10 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <div>
        {session?.user ? (
          <div className="scale-[.99]">
            <ReservationForm cabin={cabin} user={session.user} />
          </div>
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  );
}
