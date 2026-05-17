/**
 * @summary Application use cases for the registration bounded context (orchestration).
 * @author Estudiante U202319440
 */
import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Event } from '../../domain/model/event.model';
import { Attendee } from '../../domain/model/attendee.model';
import { EventRepository } from '../../domain/repositories/event.repository';
import { AttendeeRepository } from '../../domain/repositories/attendee.repository';
import { EVENT_REPOSITORY, ATTENDEE_REPOSITORY } from '../../infrastructure/tokens/registration.tokens';

export interface RegistrationCatalog {
  events: Event[];
  attendees: Attendee[];
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationFacadeService {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    @Inject(ATTENDEE_REPOSITORY) private readonly attendeeRepository: AttendeeRepository
  ) {}

  /**
   * Use case: load events and attendees for catalog or dashboard views.
   */
  loadCatalog(): Observable<RegistrationCatalog> {
    return forkJoin({
      events: this.eventRepository.getAll(),
      attendees: this.attendeeRepository.getAll()
    });
  }

  getAllEvents(): Observable<Event[]> {
    return this.eventRepository.getAll();
  }

  getAllAttendees(): Observable<Attendee[]> {
    return this.attendeeRepository.getAll();
  }
}
