/**
 * @summary Domain entity representing an event attendee and check-in state.
 * @author Estudiante U202319440
 */
export interface Attendee {
  id: number;
  firstName: string;
  lastName: string;
  eventId: number;
  ticketIdentifier: string;
  checkedInAt: string | null;
}
