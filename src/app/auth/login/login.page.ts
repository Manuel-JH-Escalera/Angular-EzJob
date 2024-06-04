import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        duration: 4000
      });

      await loading.present();

      const fakeToken = 'f4k3-t0k3n-s1mul4t3d';
      localStorage.setItem('userToken', fakeToken);

      setTimeout(() => {
        loading.dismiss();
        this.router.navigate(['/']);
      }, 4000);
    }
  }
}
