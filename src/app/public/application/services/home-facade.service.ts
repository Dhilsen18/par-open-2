/**
 * @summary Application orchestration for the Home view across registration and engagement contexts.
 * @author Estudiante U202319440
 */
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegistrationFacadeService } from '../../../registration/application/services/registration-facade.service';
import { EngagementFacadeService } from '../../../engagement/application/services/engagement-facade.service';
import { Event } from '../../../registration/domain/model/event.model';
import { Attendee } from '../../../registration/domain/model/attendee.model';
import { Rating } from '../../../engagement/domain/model/rating.model';

export interface HomePageData {
  events: Event[];
  attendees: Attendee[];
  ratings: Rating[];
}

@Injectable({
  providedIn: 'root'
})
export class HomeFacadeService {
  constructor(
    private readonly registrationFacade: RegistrationFacadeService,
    private readonly engagementFacade: EngagementFacadeService
  ) {}

  /**
   * Use case: load all data required by the Home registered-events grid.
   */
  loadHomePageData(): Observable<HomePageData> {
    return forkJoin({
      catalog: this.registrationFacade.loadCatalog(),
      ratings: this.engagementFacade.getAllRatings()
    }).pipe(
      map(({ catalog, ratings }) => ({
        events: catalog.events,
        attendees: catalog.attendees,
        ratings
      }))
    );
  }
}
