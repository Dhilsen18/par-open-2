/**
 * @summary HTTP adapter for the events API (Infrastructure / persistence).
 * @author Estudiante U202319440
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../domain/model/event.model';
import { EventRepository } from '../../domain/repositories/event.repository';

@Injectable({
  providedIn: 'root'
})
export class HttpEventRepository implements EventRepository {
  private readonly apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
}
