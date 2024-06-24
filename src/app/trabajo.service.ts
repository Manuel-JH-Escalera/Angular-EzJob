import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Trabajo {
  title: string;
  link: string;
  company: string;
  location: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  private apiUrl = 'http://localhost:3000/scrape/chiletrabajos';

  constructor(private http: HttpClient) {}

  // Obtener todos los trabajos desde el endpoint
  getTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.apiUrl);
  }

}
