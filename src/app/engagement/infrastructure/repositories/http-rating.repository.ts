/**
 * @summary HTTP adapter for the ratings API (Infrastructure / persistence).
 * @author Estudiante U202319440
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../../domain/model/rating.model';
import { RatingRepository } from '../../domain/repositories/rating.repository';

@Injectable({
  providedIn: 'root'
})
export class HttpRatingRepository implements RatingRepository {
  private readonly apiUrl = 'http://localhost:3000/ratings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.apiUrl);
  }

  create(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, rating);
  }
}
