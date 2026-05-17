/**
 * @summary Presentation: Home page — registered events grid (orchestration via HomeFacade).
 * @author Estudiante U202319440
 */
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslateModule } from '@ngx-translate/core';
import { HomeFacadeService } from '../../application/services/home-facade.service';
import { Event } from '../../../registration/domain/model/event.model';
import { Attendee } from '../../../registration/domain/model/attendee.model';
import { Rating } from '../../../engagement/domain/model/rating.model';
import { EventSummaryComponent } from '../../../registration/components/event-summary/event-summary.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, TranslateModule, EventSummaryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  attendees: Attendee[] = [];
  ratings: Rating[] = [];
  isLoading = true;
  gridCols = 2;

  constructor(private readonly homeFacade: HomeFacadeService) {}

  ngOnInit(): void {
    this.updateGridCols(window.innerWidth);
    this.loadData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.updateGridCols((event.target as Window).innerWidth);
  }

  private updateGridCols(width: number): void {
    this.gridCols = width < 768 ? 1 : 2;
  }

  private loadData(): void {
    this.homeFacade.loadHomePageData().subscribe({
      next: ({ events, attendees, ratings }) => {
        this.events = events;
        this.attendees = attendees;
        this.ratings = ratings;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading home data:', err);
        this.isLoading = false;
      }
    });
  }
}
