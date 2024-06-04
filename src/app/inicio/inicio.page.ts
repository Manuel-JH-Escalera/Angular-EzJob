import { Component, OnInit } from '@angular/core';

interface Job {
  title: string;
  portal: string;
  date: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

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


  constructor() { }

  ngOnInit() {
  }

}
