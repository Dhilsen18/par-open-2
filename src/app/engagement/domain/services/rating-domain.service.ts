/**
 * @summary Domain rules for rating eligibility and duplicate prevention.
 * @author Estudiante U202319440
 */
import { Injectable } from '@angular/core';
import { Attendee } from '../../../registration/domain/model/attendee.model';
import { Rating } from '../model/rating.model';

export type RatingSubmissionError = 'invalidTicket' | 'notAttended' | 'alreadyRated';

export interface RatingSubmissionRequest {
  ticketIdentifier: string;
  rating: number;
}

export type RatingSubmissionResult =
  | { status: 'success'; rating: Rating }
  | { status: 'error'; code: RatingSubmissionError };

@Injectable({
  providedIn: 'root'
})
export class RatingDomainService {
  /**
   * Validates business rules and builds the rating entity when eligible.
   */
  evaluateSubmission(
    request: RatingSubmissionRequest,
    attendees: Attendee[],
    existingRatings: Rating[]
  ): RatingSubmissionResult {
    const attendee = attendees.find(a => a.ticketIdentifier === request.ticketIdentifier.trim());

    if (!attendee) {
      return { status: 'error', code: 'invalidTicket' };
    }

    if (!attendee.checkedInAt) {
      return { status: 'error', code: 'notAttended' };
    }

    const alreadyRated = existingRatings.some(
      r => r.attendeeId === attendee.id && r.eventId === attendee.eventId
    );

    if (alreadyRated) {
      return { status: 'error', code: 'alreadyRated' };
    }

    return {
      status: 'success',
      rating: {
        attendeeId: attendee.id,
        eventId: attendee.eventId,
        rating: request.rating,
        ratedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Presentation-layer form validation (integer 1–5).
   */
  isValidRatingValue(value: number | null): boolean {
    return value !== null && Number.isInteger(value) && value >= 1 && value <= 5;
  }
}
