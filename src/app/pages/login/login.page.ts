import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
  ],
})
export class LoginPage implements OnInit {
  // Declare for initialization dependencies injected in the constructor
  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: Auth,
  ) {}

  ngOnInit() {}

  email = 'admin@test.com';
  password = '123456';

  async login() {
    if (!this.email || !this.password) {
      await this.showToast('Email and password are required');
      return;
    }

    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/home']);
      return;
    }
    await this.showToast('Invalid email or password');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }
}
