/**
 * @summary Domain service with pure business rules for event attendee and rating statistics.
 * @author Estudiante U202319440
 */
import { Injectable } from '@angular/core';
import { Attendee } from '../model/attendee.model';

/** Minimal rating shape required by registration statistics (cross-context read model). */
export interface EventRatingSnapshot {
  attendeeId: number;
  eventId: number;
  rating: number;
}

export interface EventStatistics {
  checkedInCount: number;
  averageRating: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class EventStatisticsService {
  /**
   * Counts attendees who checked in for the given event.
   */
  countCheckedInAttendees(eventId: number, attendees: Attendee[]): number {
    return attendees.filter(a => a.eventId === eventId && a.checkedInAt !== null).length;
  }

  /**
   * Computes the average rating (1 decimal) using only ratings from checked-in attendees.
   * Returns null when no qualifying ratings exist.
   */
  computeAverageRating(
    eventId: number,
    attendees: Attendee[],
    ratings: EventRatingSnapshot[]
  ): number | null {
    const checkedInAttendeeIds = new Set(
      attendees
        .filter(a => a.eventId === eventId && a.checkedInAt !== null)
        .map(a => a.id)
    );

    const eligibleRatings = ratings.filter(
      r => r.eventId === eventId && checkedInAttendeeIds.has(r.attendeeId)
    );

    if (eligibleRatings.length === 0) {
      return null;
    }

    const sum = eligibleRatings.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / eligibleRatings.length) * 10) / 10;
  }

  /**
   * Builds statistics for a single event.
   */
  buildStatistics(
    eventId: number,
    attendees: Attendee[],
    ratings: EventRatingSnapshot[]
  ): EventStatistics {
    return {
      checkedInCount: this.countCheckedInAttendees(eventId, attendees),
      averageRating: this.computeAverageRating(eventId, attendees, ratings)
    };
  }
}
