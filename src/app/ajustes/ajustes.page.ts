import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  selectedLanguage: string = 'es';

  onLanguageChange() {
    console.log('Idioma seleccionado:', this.selectedLanguage);
  }

  constructor() { }

  ngOnInit() {
  }

}
