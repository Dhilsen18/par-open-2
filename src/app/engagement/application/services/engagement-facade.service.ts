/**
 * @summary Application use cases for submitting and querying ratings.
 * @author Estudiante U202319440
 */
import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttendeeRepository } from '../../../registration/domain/repositories/attendee.repository';
import { ATTENDEE_REPOSITORY } from '../../../registration/infrastructure/tokens/registration.tokens';
import { Rating } from '../../domain/model/rating.model';
import { RatingRepository } from '../../domain/repositories/rating.repository';
import {
  RatingDomainService,
  RatingSubmissionRequest,
  RatingSubmissionResult
} from '../../domain/services/rating-domain.service';
import { RATING_REPOSITORY } from '../../infrastructure/tokens/engagement.tokens';

@Injectable({
  providedIn: 'root'
})
export class EngagementFacadeService {
  constructor(
    @Inject(RATING_REPOSITORY) private readonly ratingRepository: RatingRepository,
    @Inject(ATTENDEE_REPOSITORY) private readonly attendeeRepository: AttendeeRepository,
    private readonly ratingDomainService: RatingDomainService
  ) {}

  getAllRatings(): Observable<Rating[]> {
    return this.ratingRepository.getAll();
  }

  /**
   * Use case: submit a rating after validating ticket, check-in, and duplicates.
   */
  submitRating(request: RatingSubmissionRequest): Observable<RatingSubmissionResult> {
    return forkJoin({
      attendees: this.attendeeRepository.getAll(),
      ratings: this.ratingRepository.getAll()
    }).pipe(
      switchMap(({ attendees, ratings }) => {
        const evaluation = this.ratingDomainService.evaluateSubmission(
          request,
          attendees,
          ratings
        );

        if (evaluation.status === 'error') {
          return of(evaluation);
        }

        return this.ratingRepository.create(evaluation.rating).pipe(
          map(() => ({ status: 'success' as const, rating: evaluation.rating }))
        );
      })
    );
  }
}
