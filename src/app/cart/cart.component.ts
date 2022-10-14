import { Component, OnInit } from '@angular/core';
import { CartcontainerService } from '../services/cartcontainer.service';
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
	cartItems: any = [];
	totalPrice: number = 0;
	constructor(private cartService: CartcontainerService) {}
	ngOnInit(): void {
		this.cartService.cartArray.subscribe((arr) => (this.cartItems = arr));
		this.cartService.carttotal.subscribe((val) => (this.totalPrice = val));
	}
}

