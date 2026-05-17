/**
 * @summary HTTP adapter for the attendees API (Infrastructure / persistence).
 * @author Estudiante U202319440
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendee } from '../../domain/model/attendee.model';
import { AttendeeRepository } from '../../domain/repositories/attendee.repository';

@Injectable({
  providedIn: 'root'
})
export class HttpAttendeeRepository implements AttendeeRepository {
  private readonly apiUrl = 'http://localhost:3000/attendees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(this.apiUrl);
  }
}
