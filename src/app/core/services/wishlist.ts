import { Injectable, signal } from '@angular/core';
import { WishlistItem } from '../../models/wishlist-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly apiUrl = 'http://localhost:3000/wishlist';

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(this.apiUrl);
  }

  addItem(item: Omit<WishlistItem, 'id'>): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(this.apiUrl, item);
  }

  updateItem(
    id: number,
    item: Omit<WishlistItem, 'id'>,
  ): Observable<WishlistItem> {
    return this.http.put<WishlistItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  togglePurchased(item: WishlistItem): Observable<WishlistItem> {
    const updatedItem = {
      name: item.name,
      category: item.category,
      price: item.price,
      icon: item.icon,
      isPurchased: !item.isPurchased,
    };

    return this.http.put<WishlistItem>(
      `${this.apiUrl}/${item.id}`,
      updatedItem,
    );
  }
}
