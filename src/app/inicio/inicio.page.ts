import { Component, OnInit } from '@angular/core';
import { TrabajoService } from '../trabajo.service';
import { LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

interface Job {
  title: string;
  portal: string;
  date: string;
}

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

  saveJob(trabajo: Trabajo) {
    // Implementar lógica para guardar el trabajo
  }

  visitWebsite(trabajo: Trabajo) {
    window.open(trabajo.link, '_blank');
  }

  constructor(private trabajoService: TrabajoService, private loadingController: LoadingController) {}

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
}
