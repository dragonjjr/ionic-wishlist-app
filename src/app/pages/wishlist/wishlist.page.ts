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
  IonInput,
  IonCheckbox,
  IonAlert,
  AlertController,
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
    IonInput,
    IonCheckbox,
    IonAlert,
  ],
})
export class WishlistPage implements OnInit {

  constructor(
    private wishlistService: WishlistService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  wishlist = this.wishlistService.getWishlist();

  searchText = '';

  listFilter = 'all';

  isAddModalOpen = false;

  editingItemId: number | null = null;

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

    this.editingItemId = null;

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

    const itemData = {
      name: formValue.name!,
      category: formValue.category!,
      price: formValue.price!,
      icon: formValue.icon!,
      isPurchased: false
    };

    if (this.editingItemId === null) {

      this.wishlistService.addItem(itemData);

    } else {

      const existingItem = this.wishlist()
        .find(item => item.id === this.editingItemId);

      this.wishlistService.updateItem(
        this.editingItemId,
        {
          ...itemData,
          isPurchased: existingItem?.isPurchased ?? false
        }
      );
    }

    this.isAddModalOpen = false;
    this.editingItemId = null;
  }

  addItemForm = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    icon: ['🎁', Validators.required]
  });

  togglePurchased(id: number): void {
    this.wishlistService.togglePurchased(id);
  }

  editItem(item: WishlistItem): void {

    this.editingItemId = item.id;

    this.addItemForm.patchValue({
      name: item.name,
      category: item.category,
      price: item.price,
      icon: item.icon
    });

    this.isAddModalOpen = true;
  }

  async deleteItem(id: number): Promise<void> {

    const item = this.wishlist()
      .find(item => item.id === id);

    if (!item) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Delete Wishlist Item?',
      message: `Are you sure you want to delete "${item.name}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.wishlistService.deleteItem(id);
          }
        }
      ]
    });

    await alert.present();
  }
}
