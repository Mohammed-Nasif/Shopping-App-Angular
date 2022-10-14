import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';
import { ProductscounterService } from '../services/productscounter.service';
import { CartcontainerService } from '../services/cartcontainer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-productcard',
	templateUrl: './productcard.component.html',
	styleUrls: ['./productcard.component.css'],
})

export class ProductcardComponent implements OnInit {
	@Input() product: Product = {
		id: 0,
		createdAt: '',
		name: '',
		count: 0,
		price: 0,
		image: '',
		purchaseValue: 0,
	};
	
	alreadyInCart: boolean = false; // Flag To Check The Product Added Or Not to Cart
	productCount: number = 0; // Holding The Value Of Counter Service
	cartArray: any = []; // Holding The Cart Container Array Service
	itemsTotalPrice: number = 0; // Holding The Total Price In The Cart Service
	currPurchase: number = 0; // Holding The Value Of The Purchased Times of Item

	constructor(
		private router: Router,
		private counterService: ProductscounterService,
		private cartService: CartcontainerService,
		private toastr: ToastrService,
	) {}

	ngOnInit(): void {
		// Get The Values From Services
		this.counterService.counterVal.subscribe((val) => (this.productCount = val));
		this.cartService.carttotal.subscribe((val) => (this.itemsTotalPrice = val));
		this.cartService.cartArray.subscribe((arr) => (this.cartArray = arr));
		// Check If The Product Is Already In The Cart To Change The Flag
		if (this.cartArray.some((item: any) => item.id === this.product.id)) {
			this.alreadyInCart = true; // Flag Changed As The Cart Includes The Product
			this.currPurchase = this.cartArray.filter((item: any) => item.id === this.product.id)[0].purchaseValue; //Get The Value of The Times of Purchased of The Product
		}
	}

	// Fn To Send Navigate To Details And Send ID
	sendProductDetails() {
		//Navigate To Product Details Page And With Product Id
		this.router.navigate(['product', this.product.id]);
	}

	// Fn To Add The Item To The cart And Increase The Counter
	addToCart() {
		this.counterService.setCounter(++this.productCount); // Increase The Cart Counter By 1
		this.alreadyInCart = true; // Change The Flag [Now Cart Includes The Item]

		// Handling The Data of Product In Cart
		this.cartService.cartArray.subscribe((arr) => (this.cartArray = arr));
		this.cartArray.push(this.product); // Push The Product To The CartArray
		this.cartService.updateCart(this.cartArray); // Update CartService Array
		this.itemsTotalPrice += +this.product.price; // Update The Total Price + Product Price
		this.cartService.updateTotalPrice(this.itemsTotalPrice); // Update The TotalPrice In Cart Service
		this.product.purchaseValue = 1; // Increase The Purchase Count By 1 Time.
		this.addToCartToastr();
	}

	// Fn To Remove The Item From The cart And Increase The Counter
	removeFromCart() {
		this.currPurchase = this.cartArray.filter((item: any) => item.id === this.product.id)[0].purchaseValue;
		this.counterService.setCounter((this.productCount -= this.currPurchase));
		this.alreadyInCart = false; // Change The Flag [Now Cart Not Includes The Item]

		// Handling The Data of Product In Cart
		this.cartService.cartArray.subscribe((arr) => (this.cartArray = arr));
		this.cartArray = this.cartArray.filter((item: any) => item.id !== this.product.id); // Remove The Product CartArray
		this.cartService.updateCart(this.cartArray); // Update CartService Array
		this.itemsTotalPrice -= this.product.price * this.currPurchase; // Update The Total Price - Product Price * Times of Purchase
		this.cartService.updateTotalPrice(this.itemsTotalPrice); // Update The TotalPrice In Cart Service
		this.product.purchaseValue = 0; // Reset The Purchase Time
		this.removeFromCartToastr();
	}

	// Fn To Handle The Stock Availably Text
	stockAvaliable(fullStock: number, purchasedStock: number): string {
		let availableStock = fullStock - purchasedStock;
		let htmlText;
		if (availableStock === 0) {
			htmlText = `<span class='text-danger fw-bold'>Out Of Stock</span>`;
		} else if (availableStock === 1) {
			htmlText = `<span class='text-success fw-bold'>In Stock: <span class="text-warning fw-semibold">${availableStock}</span> <span class='text-danger fw-bold'>Last Item</span></span>`;
		} else if (availableStock < this.product.count / 2) {
			htmlText = `<span class='text-success fw-bold'>In Stock: <span class="text-warning fw-semibold">${availableStock}</span> Items</span>`;
		} else {
			htmlText = `<span class='text-success fw-bold'>In Stock: <span class="text-info fw-semibold">${availableStock}</span> Items</span>`;
		}
		return htmlText;
	}

	removeFromCartToastr() {
		this.toastr.info(`${this.product.name.substring(0, 15)} Removed From Your Cart 🛒`, 'Product Removed Successfully 🗑', {
			timeOut: 2000,
			positionClass: 'toast-top-right',
			progressBar: true,
		});
	}

	addToCartToastr() {
		this.toastr.success(`${this.product.name.substring(0, 14)} Added To Your Cart 🛒`, 'Product Added Successfully 🤩', {
			timeOut: 2000,
			positionClass: 'toast-top-right',
			progressBar: true,
		});
	}
}

/* HTML
// <p class="card-text" *ngIf="alreadyInCart; then tureContent else falseContent">
// </p>
// <ng-template #tureContent><span  [innerHtml]="stockAvaliable(product.count, currPurchase)"></span></ng-template>
// <ng-template #falseContent><span  [innerHtml]="stockAvaliable(product.count, currPurchase)"></span></ng-template>
*/
