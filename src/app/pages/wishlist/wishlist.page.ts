import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonInput
} from '@ionic/angular/standalone';

import { WishlistService } from '../../core/services/wishlist';
import { WishlistItem } from '../../models/wishlist-item';

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
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonFab,
    IonFabButton,
    FormsModule,
    ReactiveFormsModule,
    IonIcon,
    IonModal,
    IonInput
  ],
})
export class WishlistPage implements OnInit {

  constructor(
    private wishlistService: WishlistService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  wishlist = this.wishlistService.getWishlist();

  searchText = '';

  listFilter = 'all';

  isAddModalOpen = false;

  filteredWishlist(): WishlistItem[] {

    const items = this.wishlist();

    const search = this.searchText
      .trim()
      .toLowerCase();

    return items.filter(item => {

      const matchesSearch =
        item.name.toLowerCase().includes(search);

      const matchesFilter =
        this.listFilter === 'all' ||
        (this.listFilter === 'purchased' && item.isPurchased) ||
        (this.listFilter === 'unfulfilled' && !item.isPurchased);

      return matchesSearch && matchesFilter;
    });
  }

  searchChanged(value: string): void {
    this.searchText = value;
  }

  filterChanged(value: string): void {
    this.listFilter = value;
  }

  addItem(): void {
    this.addItemForm.reset({
      name: '',
      category: '',
      price: null,
      icon: '🎁'
    });

    this.isAddModalOpen = true;

  }

  cancelAdd(): void {
    this.isAddModalOpen = false;
  }

  saveItem(): void {

    if (this.addItemForm.invalid) {
      this.addItemForm.markAllAsTouched();
      return;
    }

    const formValue = this.addItemForm.getRawValue();

    this.wishlistService.addItem({
      name: formValue.name!,
      category: formValue.category!,
      price: formValue.price!,
      icon: formValue.icon!,
      isPurchased: false
    });

    this.isAddModalOpen = false;
  }

  addItemForm = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0)]],
    icon: ['🎁', Validators.required]
  });
}
