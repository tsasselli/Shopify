import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(productService: ProductService,
              route: ActivatedRoute) {
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

}
