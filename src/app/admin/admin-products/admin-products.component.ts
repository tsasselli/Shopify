import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount = 0;

  constructor(private productService: ProductService) {
     this.productService.getAll()
      // leaves the observable open for the component... closed via onDestroy()
     .subscribe(products => {
       this.filteredProducts = this.products = products;
       this.initTable(products);
     });
   }

   private initTable(proudcts: Product[]) {
     this.tableResource = new DataTableResource(this.products);
     // used to get all the records on the current page based on the current params.. set to 0 for page 1
     this.tableResource.query({ offset: 0 }) // returns a promise
       .then(items => this.items = items);
     // count method returns the total number of products from the server
     this.tableResource.count()
       // when promise is complete uses this to initialize this.itemCount
       .then(count => this.itemCount = count);
   }

   reloadItems(params) {
     // have to check if tableRecource is falsy hit return
      if (!this.tableResource) { return; }

     this.tableResource.query(params)
       .then(items => this.items = items);
   }

  // implementing filtering on the client side after data loaded.
  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
