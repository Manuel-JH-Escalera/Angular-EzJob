import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

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
  private savedTrabajos: Trabajo[] = [];

  constructor(private http: HttpClient) {
    this.loadSavedJobs();
  }

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
    return forkJoin([this.getTrabajosChiletrabajos(), this.getTrabajosTrabajando()]).pipe(
      map(([trabajosChiletrabajos, trabajosTrabajando]) => [...trabajosChiletrabajos, ...trabajosTrabajando]),
      catchError(error => {
        console.error('Error al combinar los trabajos', error);
        return of([]);
      })
    );
  }

  loadSavedJobs() {
    const saved = localStorage.getItem('savedTrabajos');
    this.savedTrabajos = saved ? JSON.parse(saved) : [];
  }

  saveJob(job: Trabajo) {
    if (this.isJobSaved(job)) {
      this.savedTrabajos = this.savedTrabajos.filter(savedJob => savedJob.title !== job.title);
    } else {
      this.savedTrabajos.push(job);
    }
    localStorage.setItem('savedTrabajos', JSON.stringify(this.savedTrabajos));
  }

  isJobSaved(job: Trabajo): boolean {
    return this.savedTrabajos.some(savedJob => savedJob.title === job.title);
  }

  getSavedJobs(): Trabajo[] {
    return this.savedTrabajos;
  }
}
