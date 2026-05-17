/**
 * @summary Port for event persistence (Infrastructure implements this contract).
 * @author Estudiante U202319440
 */
import { Observable } from 'rxjs';
import { Event } from '../model/event.model';

export interface EventRepository {
  getAll(): Observable<Event[]>;
}
