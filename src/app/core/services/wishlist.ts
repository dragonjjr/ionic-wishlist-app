import { Injectable, signal } from '@angular/core';
import { WishlistItem } from '../../models/wishlist-item';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private wishlist = signal<WishlistItem[]>([
    {
      id: 1,
      name: 'AirPods Pro',
      category: 'Electronics',
      price: 249,
      icon: '🎧',
      isPurchased: false
    },
    {
      id: 2,
      name: 'Keychron K2',
      category: 'Electronics',
      price: 120,
      icon: '⌨️',
      isPurchased: true
    },
    {
      id: 3,
      name: 'Clean Code',
      category: 'Books',
      price: 35,
      icon: '📚',
      isPurchased: false
    }
  ]);

  getWishlist() {
    return this.wishlist;
  }
}
