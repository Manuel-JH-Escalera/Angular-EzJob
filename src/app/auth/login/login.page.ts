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
        duration: 3000
      });

      await loading.present();

      const email = this.loginForm.get('email')?.value;
      const username = email.split('@')[0];

      const userObject = {
        email: email,
        username: username
      };

      localStorage.setItem('userObject', JSON.stringify(userObject));

      setTimeout(() => {
        loading.dismiss();
        this.router.navigate(['/']);
      }, 4000);
    }
  }
}
