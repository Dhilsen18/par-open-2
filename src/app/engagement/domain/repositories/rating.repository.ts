/**
 * @summary Port for rating persistence (Infrastructure implements this contract).
 * @author Estudiante U202319440
 */
import { Observable } from 'rxjs';
import { Rating } from '../model/rating.model';

export interface RatingRepository {
  getAll(): Observable<Rating[]>;
  create(rating: Rating): Observable<Rating>;
}
