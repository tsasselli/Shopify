import { Router } from '@angular/router';
import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  shipping = {};
  cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(private cartService: ShoppingCartService,
              private authService: AuthService,
              private orderService: OrderService,
              private router: Router) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }    
}
