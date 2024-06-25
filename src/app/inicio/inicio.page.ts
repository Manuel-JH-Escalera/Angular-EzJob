import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrabajoService } from '../trabajo.service';
import { LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

interface Trabajo {
  title: string;
  link: string;
  company: string;
  location: string;
  date: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  trabajos!: Trabajo[];
  trabajosCombinados!: Trabajo[];
  loading: boolean = true;
  searchTitle: string = '';

  constructor(
    private trabajoService: TrabajoService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCombinedTrabajos();
  }

  fetchCombinedTrabajos() {
    this.loading = true;
    this.trabajoService.getCombinedTrabajos().subscribe(
      (data: Trabajo[]) => {
        this.trabajosCombinados = data;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al obtener los trabajos combinados', error);
        this.loading = false;
      }
    );
  }

  updateTrabajos() {
    this.loading = true;
    forkJoin([
      this.trabajoService.updateTrabajosChiletrabajos(),
      this.trabajoService.updateTrabajosTrabajando()
    ]).subscribe(
      ([dataChiletrabajos, dataTrabajando]: [Trabajo[], Trabajo[]]) => {
        this.trabajosCombinados = [...dataChiletrabajos, ...dataTrabajando];
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al actualizar los trabajos', error);
        this.loading = false;
      }
    );
  }

  searchJobs() {
    this.router.navigate(['/tabs/empleos'], { queryParams: { title: this.searchTitle } });
  }

  saveJob(trabajo: Trabajo) {
    // Implementar lógica para guardar el trabajo
  }

  visitWebsite(trabajo: Trabajo) {
    window.open(trabajo.link, '_blank');
  }
}