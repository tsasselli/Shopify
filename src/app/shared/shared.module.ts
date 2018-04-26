import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminAuthGuardService } from '../admin/service/admin-auth-guard.service';
import { CategoryService } from 'shared/service/category.service';
import { OrderService } from 'shared/service/order.service';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './service/auth.service';
import { ProductService } from './service/product.service';
import { UserService } from './service/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ]
})
export class SharedModule { }
