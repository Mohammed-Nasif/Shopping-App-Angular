import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CartcontainerService {
	private cartContainer = new BehaviorSubject([]);
	cartArray = this.cartContainer.asObservable();

	private carttotalPrice = new BehaviorSubject(0);
	carttotal = this.carttotalPrice.asObservable();

	constructor() {}

	updateCart(updatedArray: []) {
		this.cartContainer.next(updatedArray);
	}

	getItems() {
		return this.cartArray;
	}

	updateTotalPrice(updatedPrice: number) {
		this.carttotalPrice.next(updatedPrice);
	}
}
