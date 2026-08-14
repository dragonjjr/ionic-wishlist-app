import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

import { WishlistService } from '../../core/services/wishlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class HomePage implements OnInit {
    constructor(
    private router: Router,
    private authService: Auth,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit() {}

  wishlist = this.wishlistService.getWishlist();
  
  // If the wishlist changes, the totalItems and purchasedItems will automatically update
  totalItems = computed(() => this.wishlist().length);

  purchasedItems = computed(
    () => this.wishlist().filter((item) => item.isPurchased).length,
  );

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}
