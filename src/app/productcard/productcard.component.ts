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
	alreadyInCart: boolean = false;
	inWishlist: boolean = false;
	productCount: number = 0;
	cartArray: any = [];
	itemsTotalPrice: number = 0;
	currPurchase: number = 0;
	heartIcon = faHeartCirclePlus;
	wishList: any = {};
	stockHtmlText: string = '';
	constructor(
		private router: Router,
		private counterService: ProductscounterService,
		private cartService: CartcontainerService,
		private toastr: ToastrService,
		private store: Store<{ wishList: Array<Product> }>,
	) {}

	ngOnInit(): void {
		this.counterService.counterVal.subscribe((val) => (this.productCount = val));
		this.cartService.carttotal.subscribe((val) => (this.itemsTotalPrice = val));
		this.cartService.cartArray.subscribe((arr) => (this.cartArray = arr));

		if (this.cartArray.some((item: any) => item.id === this.product.id)) {
			console.log('incart from product');
			this.alreadyInCart = true;
			this.currPurchase = this.cartArray.filter((item: any) => item.id === this.product.id)[0].purchaseValue;
		}
		this.store.select('wishList').subscribe((res) => (this.wishList = res));
	}
	ngDoCheck(): void {
		if (this.wishList.itemsList) {
			if (this.wishList.itemsList.some((item: any) => item.id === this.product.id)) {
				this.inWishlist = true;
			} else {
				this.inWishlist = false;
			}
		}

		if (!this.currPurchase || this.currPurchase) {
			this.stockAvaliable();
		}
	}
	addToCart(): void {
		this.counterService.setCounter(++this.productCount);
		this.alreadyInCart = true;
		this.currPurchase = 1;
		this.product.purchaseValue = 1;
		this.cartArray.push(this.product);
		this.cartService.updateCart(this.cartArray);
		this.itemsTotalPrice += +this.product.price;
		this.cartService.updateTotalPrice(this.itemsTotalPrice);
		this.addToCartToastr();
	}

	removeFromCart(): void {
		this.currPurchase = this.cartArray.filter((item: any) => item.id === this.product.id)[0].purchaseValue;
		this.counterService.setCounter((this.productCount -= this.currPurchase));
		this.alreadyInCart = false;
		this.cartArray = this.cartArray.filter((item: any) => item.id !== this.product.id);
		this.cartService.updateCart(this.cartArray);
		this.itemsTotalPrice -= this.product.price * this.currPurchase;
		this.cartService.updateTotalPrice(this.itemsTotalPrice);
		this.product.purchaseValue = 0;
		this.currPurchase = 0;
		this.removeFromCartToastr();
	}

	sendProductDetails(): void {
		this.router.navigate(['product', this.product.id]);
	}

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
		this.store.dispatch(addToWishlist({ item: { ...this.product } }));
		this.inWishlist = true;
	}
	removeFromWishlist(): void {
		let clearedProduct = this.wishList.itemsList.filter((item: Product) => item.id === this.product.id)[0];
		this.store.dispatch(removefromWishlist({ item: clearedProduct }));
		this.inWishlist = false;
	}
}
