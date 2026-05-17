/**
 * @summary Port for attendee persistence (Infrastructure implements this contract).
 * @author Estudiante U202319440
 */
import { Observable } from 'rxjs';
import { Attendee } from '../model/attendee.model';

export interface AttendeeRepository {
  getAll(): Observable<Attendee[]>;
}
