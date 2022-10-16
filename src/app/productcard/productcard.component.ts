import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';
import { ProductscounterService } from '../services/productscounter.service';
import { CartcontainerService } from '../services/cartcontainer.service';
import { ToastrService } from 'ngx-toastr';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { addToWishlist, removefromWishlist } from './../store/wishlist/wishlist.action';

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
	inWishlist: boolean = false; // Flag To Check The Product Added Or Not to Wishlist
	productCount: number = 0; // Holding The Value Of Counter Service
	cartArray: any = []; // Holding The Cart Container Array Service
	itemsTotalPrice: number = 0; // Holding The Total Price In The Cart Service
	currPurchase: number = 0; // Holding The Value Of The Purchased Times of Item
	heartIcon = faHeartCirclePlus; // Wish List Icon
	wishList: any = {}; // Empty object To Store The Data From ngrx Store
	stockHtmlText: string = '';
	constructor(
		private router: Router,
		private counterService: ProductscounterService,
		private cartService: CartcontainerService,
		private toastr: ToastrService,
		private store: Store<{ wishList: Array<Product> }>,
	) {}

	ngOnInit(): void {
		// Get The Values From Services
		this.counterService.counterVal.subscribe((val) => (this.productCount = val));
		this.cartService.carttotal.subscribe((val) => (this.itemsTotalPrice = val));
		this.cartService.cartArray.subscribe((arr) => (this.cartArray = arr));
		// Check If The Product Is Already In The Cart To Change The Flag
		if (this.cartArray.some((item: any) => item.id === this.product.id)) {
			console.log('incart from product');
			this.alreadyInCart = true; // Flag Changed As The Cart Includes The Product
			this.currPurchase = this.cartArray.filter((item: any) => item.id === this.product.id)[0].purchaseValue; //Get The Value of The Times of Purchased of The Product
		}
		// Get The Value From Store
		this.store.select('wishList').subscribe((res) => (this.wishList = res));
		// console.log(this.wishList);
	}
	ngDoCheck(): void {
		//Check To Set The Color Of Fav (Withlist) Btn
		if (this.wishList.itemsList) {
			if (this.wishList.itemsList.some((item: any) => item.id === this.product.id)) {
				this.inWishlist = true;
			} else {
				this.inWishlist = false;
			}
		}

		//Check To Change The Stock HTML Text
		if (!this.currPurchase || this.currPurchase) {
			this.stockAvaliable();
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

	// Fn To Send Navigate To Details And Send ID
	sendProductDetails(): void {
		// Navigate To Product Details Page And With Product Id
		this.router.navigate(['product', this.product.id]);
	}

	// Fn To Handle The Stock Availably Text
	stockAvaliable(): void {
		let availableStock = this.product.count - this.currPurchase;
		if (availableStock === 0) {
			this.stockHtmlText = `<span class='text-danger fw-bold'>Out Of Stock</span>`;
		} else if (availableStock === 1) {
			this.stockHtmlText = `<span class='text-success fw-bold'>In Stock: <span class="text-warning fw-semibold">${availableStock}</span> <span class='text-danger fw-bold'>Last Item</span></span>`;
		} else if (availableStock < this.product.count / 2) {
			this.stockHtmlText = `<span class='text-success fw-bold'>In Stock: <span class="text-warning fw-semibold">${availableStock}</span> Items "Low Stock!"</span>`;
		} else {
			this.stockHtmlText = `<span class='text-success fw-bold'>In Stock: <span class="text-info fw-semibold">${availableStock}</span> Items</span>`;
		}
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

	addToWishlist(): void {
		// Add The Product To The Wishlist Store Array
		this.store.dispatch(addToWishlist({ item: { ...this.product } }));
		this.inWishlist = true;
	}
	removeFromWishlist(): void {
		let clearedProduct = this.wishList.itemsList.filter((item: Product) => item.id === this.product.id)[0];
		this.store.dispatch(removefromWishlist({ item: clearedProduct }));
		this.inWishlist = false;
	}
}
