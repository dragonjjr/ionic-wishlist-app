import { Injectable, signal } from '@angular/core';
import { WishlistItem } from '../../models/wishlist-item';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly storageKey = 'wishlist';

  private wishlist = signal<WishlistItem[]>(
    this.loadWishlist()
  );

  private loadWishlist(): WishlistItem[] {

    const stored = localStorage.getItem(this.storageKey);

    if (!stored) {
      return [
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
      ];
    }

    return JSON.parse(stored);
  }

  getWishlist() {
    return this.wishlist;
  }

  addItem(
    item: Omit<WishlistItem, 'id'>
  ): void {

    this.wishlist.update(items => {

      const newId =
        items.length > 0
          ? Math.max(...items.map(item => item.id)) + 1
          : 1;

      const updatedItems = [
        ...items,
        {
          id: newId,
          ...item
        }
      ];

      this.saveWishlist(updatedItems);

      return updatedItems;
    });
  }

  updateItem(
    id: number,
    updatedItem: Omit<WishlistItem, 'id'>
  ): void {

    this.wishlist.update(items => {

      const updatedItems = items.map(item =>
        item.id === id
          ? {
            id,
            ...updatedItem
          }
          : item
      );

      this.saveWishlist(updatedItems);

      return updatedItems;
    });
  }

  deleteItem(id: number): void {

    this.wishlist.update(items => {

      const updatedItems =
        items.filter(item => item.id !== id);

      this.saveWishlist(updatedItems);

      return updatedItems;
    });
  }

  togglePurchased(id: number): void {

    this.wishlist.update(items => {

      const updatedItems = items.map(item =>
        item.id === id
          ? {
            ...item,
            isPurchased: !item.isPurchased
          }
          : item
      );

      this.saveWishlist(updatedItems);

      return updatedItems;
    });
  }

  private saveWishlist(items: WishlistItem[]): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(items)
    );
  }
}