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
	alreadyInCart: boolean = false;
	productCount: number = 0;
	cartArray: any = [];
	itemsTotalPrice: number = 0;
	currPurchase: number = 0;
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

		this.counterService.counterVal.subscribe((val) => (this.productCount = val));
		this.cartService.carttotal.subscribe((val) => (this.itemsTotalPrice = val));
		this.cartService.cartArray.subscribe((arr) => (this.cartArray = arr));

		if (this.cartArray.some((item: any) => item.id === this.product.id)) {
			this.alreadyInCart = true;
			this.currPurchase = this.cartArray.filter((item: any) => item.id === this.product.id)[0].purchaseValue;
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
