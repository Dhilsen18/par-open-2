/**
 * @summary Presentation: rating form — delegates validation and persistence to EngagementFacade.
 * @author Estudiante U202319440
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { EngagementFacadeService } from '../../application/services/engagement-facade.service';
import {
  RatingDomainService,
  RatingSubmissionError
} from '../../domain/services/rating-domain.service';

type RatingResultState = 'success' | RatingSubmissionError | null;

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    TranslateModule
  ],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  ticketIdentifier = '';
  ratingValue: number | null = null;
  result: RatingResultState = null;
  isSubmitting = false;

  constructor(
    private readonly engagementFacade: EngagementFacadeService,
    private readonly ratingDomainService: RatingDomainService
  ) {}

  onRateEvent(): void {
    if (!this.isFormValid) return;

    this.isSubmitting = true;
    this.result = null;

    this.engagementFacade
      .submitRating({
        ticketIdentifier: this.ticketIdentifier,
        rating: this.ratingValue!
      })
      .subscribe({
        next: outcome => {
          if (outcome.status === 'success') {
            this.result = 'success';
            this.ticketIdentifier = '';
            this.ratingValue = null;
          } else {
            this.result = outcome.code;
          }
          this.isSubmitting = false;
        },
        error: err => {
          console.error('Error submitting rating:', err);
          this.isSubmitting = false;
        }
      });
  }

  get isFormValid(): boolean {
    return !!(
      this.ticketIdentifier.trim() &&
      this.ratingDomainService.isValidRatingValue(this.ratingValue)
    );
  }
}
