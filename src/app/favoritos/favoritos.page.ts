import { Component, OnInit } from '@angular/core';
import { TrabajoService } from '../trabajo.service';

interface Trabajo {
  title: string;
  link: string;
  company: string;
  location: string;
  date: string;
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  savedTrabajos: Trabajo[] = [];

  constructor(private trabajoService: TrabajoService) {}

  ngOnInit() {
    this.loadSavedJobs();
  }

  loadSavedJobs() {
    this.savedTrabajos = this.trabajoService.getSavedJobs();
  }

  removeJob(job: Trabajo) {
    this.trabajoService.saveJob(job);
    this.loadSavedJobs();
  }

  visitWebsite(job: Trabajo) {
    window.open(job.link, '_blank');
  }
}
