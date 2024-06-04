import { Component, OnInit } from '@angular/core';

interface Job {
  title: string;
  portal: string;
  date: string;
}

@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.page.html',
  styleUrls: ['./empleos.page.scss'],
})

export class EmpleosPage implements OnInit {

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
    },
    {
      title: 'Desarrollador Backend',
      portal: 'example.com',
      date: '01/06/2024'
    },
    {
      title: 'Analista de Datos',
      portal: 'jobsite.com',
      date: '01/06/2024'
    }
  ];

  constructor() { }

  searchJobs() {
  }

  sortJobsByDate() {

  }

  applyJob(job: Job) {

  }

  saveJob(job: Job) {

  }

  visitWebsite(job: Job) {
    window.open(job.portal, '_blank');

  }

  ngOnInit() {
  }

}
