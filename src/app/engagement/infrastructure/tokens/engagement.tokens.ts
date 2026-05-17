/**
 * @summary Dependency-injection tokens for the engagement bounded context.
 * @author Estudiante U202319440
 */
import { InjectionToken } from '@angular/core';
import { RatingRepository } from '../../domain/repositories/rating.repository';

export const RATING_REPOSITORY = new InjectionToken<RatingRepository>('RATING_REPOSITORY');
