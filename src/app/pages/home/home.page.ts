import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { WishlistItem } from '../../models/wishlist-item';
import { ViewWillEnter } from '@ionic/angular';
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
export class HomePage implements OnInit, ViewWillEnter {
  constructor(
    private router: Router,
    private authService: Auth,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit() {}

  wishlist = signal<WishlistItem[]>([]);

  totalItems = computed(() => this.wishlist().length);

  totalPurchased = computed(
    () => this.wishlist().filter((item) => item.isPurchased).length,
  );

  ionViewWillEnter(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe((items) => {
      this.wishlist.set(items);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}
