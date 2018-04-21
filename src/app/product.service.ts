import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
     return this.db.list('/products'); // ,
    //   ref => ref.orderByChild('title'))
    //   .snapshotChanges();
    //   .map(actions => {
    //   return actions.map(action => ({
    //     key: action.key,
    //     title: action.payload.val().title,
    //     imageUrl: action.payload.val().imageUrl,
    //     price: action.payload.val().price,
    //     category: action.payload.val().category
    //   }));
    // });
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId);
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
