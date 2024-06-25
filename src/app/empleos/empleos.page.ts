import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrabajoService } from '../trabajo.service';

interface Trabajo {
  title: string;
  link: string;
  company: string;
  location: string;
  date: string;
}

@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.page.html',
  styleUrls: ['./empleos.page.scss'],
})
export class EmpleosPage implements OnInit {

  trabajos: Trabajo[] = [];
  filteredTrabajos: Trabajo[] = [];
  loading: boolean = true;
  searchTitle: string = '';

  constructor(
    private trabajoService: TrabajoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTitle = params['title'] || '';
      this.fetchTrabajos();
    });
  }

  fetchTrabajos() {
    this.loading = true;
    this.trabajoService.getCombinedTrabajos().subscribe(
      (data: Trabajo[]) => {
        this.trabajos = data;
        this.applyFilter();
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los trabajos combinados', error);
        this.loading = false;
      }
    );
  }

  applyFilter() {
    this.filteredTrabajos = this.trabajos.filter(job => {
      return job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
    });
  }

  saveJob(job: Trabajo) {
    // Implementar lógica para guardar el trabajo
  }

  visitWebsite(job: Trabajo) {
    window.open(job.link, '_blank');
  }

  searchJobs() {
    this.applyFilter();
  }

  sortJobsByDate() {
    // Implementar lógica para ordenar trabajos por fecha
  }

  applyJob(job: Trabajo) {
    // Implementar lógica para aplicar a un trabajo
  }

}
