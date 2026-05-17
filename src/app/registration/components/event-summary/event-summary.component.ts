/**
 * @summary Presentation: event summary card — statistics from EventStatisticsService (domain).
 * @author Estudiante U202319440
 */
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Event } from '../../domain/model/event.model';
import { Attendee } from '../../domain/model/attendee.model';
import { Rating } from '../../../engagement/domain/model/rating.model';
import { EventStatisticsService } from '../../domain/services/event-statistics.service';

@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule, TranslateModule],
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnChanges {
  @Input() event!: Event;
  @Input() attendees: Attendee[] = [];
  @Input() ratings: Rating[] = [];

  checkedInCount = 0;
  averageRating: number | null = null;

  constructor(private readonly eventStatisticsService: EventStatisticsService) {}

  ngOnChanges(): void {
    if (!this.event) return;
    const stats = this.eventStatisticsService.buildStatistics(
      this.event.id,
      this.attendees,
      this.ratings
    );
    this.checkedInCount = stats.checkedInCount;
    this.averageRating = stats.averageRating;
  }
}
