import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscrition: Subscription;

  constructor(productService: ProductService,
              route: ActivatedRoute,
              private shoppingCartService: ShoppingCartService) {
    productService
      .getAll()
      .switchMap(products => {
      this.products = products;
      return route.queryParamMap;
      })
        .subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?  // if have category call filter method on product array
            // gets products object and returns it if its equal to that category.
            this.products.filter(p => p.category === this.category) :
            this.products;
        });
      }

  async ngOnInit() {
    this.subscrition = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }

}
