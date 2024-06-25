import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map, concatMap } from 'rxjs/operators';

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

  private apiUrlChiletrabajos = 'https://scraper-portales-trabajo.onrender.com/scrape/chiletrabajos';
  private apiUrlTrabajando = 'https://scraper-portales-trabajo.onrender.com/scrape/trabajando';
  private trabajosChiletrabajosCache: Trabajo[] | null = null;
  private trabajosTrabajandoCache: Trabajo[] | null = null;

  constructor(private http: HttpClient) {}

  getTrabajosChiletrabajos(): Observable<Trabajo[]> {
    if (this.trabajosChiletrabajosCache) {
      return of(this.trabajosChiletrabajosCache);
    } else {
      return this.http.get<Trabajo[]>(this.apiUrlChiletrabajos).pipe(
        tap(data => this.trabajosChiletrabajosCache = data),
        catchError(error => {
          console.error('Error al obtener los trabajos', error);
          return of([]);
        })
      );
    }
  }

  updateTrabajosChiletrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.apiUrlChiletrabajos).pipe(
      tap(data => this.trabajosChiletrabajosCache = data),
      catchError(error => {
        console.error('Error al actualizar los trabajos', error);
        return of([]);
      })
    );
  }

  getTrabajosTrabajando(): Observable<Trabajo[]> {
    if (this.trabajosTrabajandoCache) {
      return of(this.trabajosTrabajandoCache);
    } else {
      return this.http.get<Trabajo[]>(this.apiUrlTrabajando).pipe(
        tap(data => this.trabajosTrabajandoCache = data),
        catchError(error => {
          console.error('Error al obtener los trabajos', error);
          return of([]);
        })
      );
    }
  }

  updateTrabajosTrabajando(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.apiUrlTrabajando).pipe(
      tap(data => this.trabajosTrabajandoCache = data),
      catchError(error => {
        console.error('Error al actualizar los trabajos', error);
        return of([]);
      })
    );
  }

  getCombinedTrabajos(): Observable<Trabajo[]> {
    return this.getTrabajosChiletrabajos().pipe(
      concatMap(trabajosChiletrabajos => 
        this.getTrabajosTrabajando().pipe(
          map(trabajosTrabajando => [...trabajosChiletrabajos, ...trabajosTrabajando])
        )
      ),
      catchError(error => {
        console.error('Error al combinar los trabajos', error);
        return of([]);
      })
    );
  }

  clearCache() {
    this.trabajosChiletrabajosCache = null;
    this.trabajosTrabajandoCache = null;
  }
}
