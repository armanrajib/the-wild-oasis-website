'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth, signIn, signOut } from '@/app/_lib/auth';
import {
  deleteBooking,
  getBookings,
  updateBooking,
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

// Update a reservation
export async function updateReservationAction(formData) {
  // 1) Authentication
  const session = await auth();

  if (!session)
    throw new Error('You must be signed in to update a reservation');

  // 2) Authorization
  const bookingId = formData.get('bookingId');
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(Number(bookingId)))
    throw new Error('You are not authorized to update this reservation');

  // 3) Validation
  const numGuests = formData.get('numGuests');
  const observations = formData.get('observations').slice(0, 1000);

  if (!numGuests || !observations)
    throw new Error('Please provide the number of guests and any observations');

  // 4) Building the updated data and updating the reservation
  const updatedData = { numGuests, observations };
  await updateBooking(bookingId, updatedData);

  // 5) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');

  // 6) Redirecting
  redirect('/account/reservations');
}
