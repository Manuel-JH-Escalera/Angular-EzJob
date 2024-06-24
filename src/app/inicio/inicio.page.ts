import { Component, OnInit } from '@angular/core';
import { TrabajoService } from '../trabajo.service';

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

  jobs: Job[] = [
    {
      title: 'Desarrollador Frontend',
      portal: 'example.com',
      date: '01/06/2024'
    },
    {
      title: 'Analista de Datos',
      portal: 'jobsite.com',
      date: '01/06/2024'
    }
  ];

  saveJob(job: Job) {

  }

  visitWebsite(job: Job) {
    window.open(job.portal, '_blank');

  }


  constructor(private trabajoService: TrabajoService) {}

  ngOnInit(): void {
    this.trabajoService.getTrabajos().subscribe(
      (data: Trabajo[]) => {
        this.trabajos = data;
      },
      (error) => {
        console.error('Error al obtener los trabajos', error);
      }
    );
  }

}
