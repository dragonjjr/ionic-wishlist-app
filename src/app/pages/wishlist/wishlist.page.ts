import { Component, computed, OnInit } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  ViewWillEnter,
} from '@ionic/angular/standalone';

import { WishlistService } from '../../core/services/wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class WishlistPage implements OnInit {
  
  constructor(
    private wishlistService: WishlistService
  ) {}
  
  ngOnInit() {}

  wishlist = this.wishlistService.getWishlist();
}
