import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { ProductscounterService } from '../services/productscounter.service';
import { CartcontainerService } from '../services/cartcontainer.service';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-productdetails',
	templateUrl: './productdetails.component.html',
	styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
	product: Product = {
		id: 0,
		createdAt: '',
		name: '',
		count: 0,
		price: 0,
		image: '',
		purchaseValue: 0,
		description: '',
		rate: 0,
	};
	cartIcon = faCartPlus;
	starIcon = faStar;
	alreadyInCart: boolean = false; // Flag To Check The Product Added Or Not to Cart
	productCount: number = 0; // Holding The Value Of Counter Service
	cartArray: any = []; // Holding The Cart Container Array Service
	itemsTotalPrice: number = 0; // Holding The Total Price In The Cart Service
	currPurchase: number = 0; // Holding The Value Of The Purchased Times of Item
	constructor(
		private route: ActivatedRoute,
		private detailsService: ProductsService,
		private counterService: ProductscounterService,
		private cartService: CartcontainerService,
		private toastr: ToastrService,
	) {
		const params = this.route.snapshot.params;
		this.product.id = params['id'];
	}
	ngOnInit() {
		this.detailsService.getProductdetials(this.product.id).subscribe((data: any) => {
			this.product = data;
		});
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

	// Fn To Add The Item To The cart And Increase The Counter
	addToCart(): void {
		this.counterService.setCounter(++this.productCount); // Increase The Cart Counter By 1
		this.alreadyInCart = true; // Change The Flag [Now Cart Includes The Item]
		// Handling The Data of Product In Cart
		this.currPurchase = 1; // Increase The Curr Purchase Count By 1 Time.
		this.product.purchaseValue = 1; // Increase The Purchase Count By 1 Time.
		this.cartArray.push(this.product); // Push The Product To The CartArray
		this.cartService.updateCart(this.cartArray); // Update CartService Array
		this.itemsTotalPrice += +this.product.price; // Update The Total Price + Product Price
		this.cartService.updateTotalPrice(this.itemsTotalPrice); // Update The TotalPrice In Cart Service
		this.addToCartToastr(); //Toastr Notify Invoke
	}

	// Fn To Remove The Item From The cart And Increase The Counter
	removeFromCart(): void {
		this.currPurchase = this.cartArray.filter((item: any) => item.id === this.product.id)[0].purchaseValue;
		this.counterService.setCounter((this.productCount -= this.currPurchase));
		this.alreadyInCart = false; // Change The Flag [Now Cart Not Includes The Item]
		// Handling The Data of Product In Cart
		this.cartArray = this.cartArray.filter((item: any) => item.id !== this.product.id); // Remove The Product CartArray
		this.cartService.updateCart(this.cartArray); // Update CartService Array
		this.itemsTotalPrice -= this.product.price * this.currPurchase; // Update The Total Price - Product Price * Times of Purchase
		this.cartService.updateTotalPrice(this.itemsTotalPrice); // Update The TotalPrice In Cart Service
		this.product.purchaseValue = 0; // Reset The Purchase Time
		this.currPurchase = 0; // Reset The Curr Purchase Time
		this.removeFromCartToastr(); //Toastr Notify Invoke
	}

	removeFromCartToastr(): void {
		this.toastr.info(`${this.product.name.substring(0, 14)} Removed From 🛒`, 'Removed Successfully 🗑', {
			timeOut: 2000,
			positionClass: 'toast-top-right',
			progressBar: true,
		});
	}

	addToCartToastr(): void {
		this.toastr.success(`${this.product.name.substring(0, 14)} Added To 🛒`, 'Added Successfully 🤩', {
			timeOut: 2000,
			positionClass: 'toast-top-right',
			progressBar: true,
		});
	}
}
