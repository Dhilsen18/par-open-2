/**
 * @summary Domain entity representing an attendee rating for an event.
 * @author Estudiante U202319440
 */
export interface Rating {
  id?: number;
  attendeeId: number;
  eventId: number;
  rating: number;
  ratedAt: string;
}
