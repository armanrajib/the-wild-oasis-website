'use client';

import { useOptimistic } from 'react';

import ReservationCard from '@/app/_components/ReservationCard';
import { deleteReservationAction } from '@/app/_lib/actions';

export default function ReservationList({ bookings }) {
  const [optimisticBookings, deleteOptimisticBooking] = useOptimistic(
    bookings,
    (curBookings, bookingId) =>
      curBookings.filter((booking) => booking.id !== bookingId)
  );

  async function handleDeleteReservation(bookingId) {
    deleteOptimisticBooking(bookingId);
    await deleteReservationAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDeleteReservation={handleDeleteReservation}
        />
      ))}
    </ul>
  );
}
