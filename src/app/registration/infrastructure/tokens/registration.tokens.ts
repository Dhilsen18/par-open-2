/**
 * @summary Dependency-injection tokens wiring domain ports to infrastructure adapters.
 * @author Estudiante U202319440
 */
import { InjectionToken } from '@angular/core';
import { EventRepository } from '../../domain/repositories/event.repository';
import { AttendeeRepository } from '../../domain/repositories/attendee.repository';

export const EVENT_REPOSITORY = new InjectionToken<EventRepository>('EVENT_REPOSITORY');
export const ATTENDEE_REPOSITORY = new InjectionToken<AttendeeRepository>('ATTENDEE_REPOSITORY');
