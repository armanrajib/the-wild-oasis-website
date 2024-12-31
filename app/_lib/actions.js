'use server';

import { revalidatePath } from 'next/cache';

import { auth, signIn, signOut } from '@/app/_lib/auth';
import {
  deleteBooking,
  getBookings,
  updateGuest,
} from '@/app/_lib/data-service';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

// Update guest profile
export async function updateGuestAction(formData) {
  const session = await auth();

  if (!session) throw new Error('You must be signed in to update your profile');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid national ID number');

  const updatedData = { nationality, countryFlag, nationalID };

  await updateGuest(session.user.guestId, updatedData);

  revalidatePath('/account');
}

// Delete a reservation
export async function deleteReservationAction(bookingId) {
  const session = await auth();

  if (!session)
    throw new Error('You must be signed in to delete a reservation');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not authorized to delete this reservation');

  await deleteBooking(bookingId);

  revalidatePath('/account/reservations');
}
