import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private loggedIn = signal(localStorage.getItem('isLoggedIn') === 'true');

  login(email: string, password: string): boolean {
    if (email === 'admin@test.com' && password === '123456') {
      this.loggedIn.set(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }

    return false;
  }

  logout(): void {
    this.loggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }
}
