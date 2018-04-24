import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

   async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>> {
     const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
      // if local storage has cartID, return it.. else create one and store it.
    if (cartId) { return cartId; }
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
  }

  private getItem(cartId: string, productId: string) {
    // items observeble sets an object in db based off of cartID then adds the product key to items
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

    async addToCart(product: Product) {
     this.updateItemQuantity(product, 1);
    }

   async removeFromCart(product: Product) {
     this.updateItemQuantity(product, -1);
    }

    private async updateItemQuantity(product: Product, change: number) {
      const cartId = await this.getOrCreateCartId();
      const item$ = this.getItem(cartId, product.$key);
      // take one kills the observable so you dont have to unsubscribe.
      item$.take(1).subscribe(item => {
        item$.update({ product: product, quantity: (item.quantity || 0) + change });
      });
    }
}
