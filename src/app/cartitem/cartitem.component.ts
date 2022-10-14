import { Component, Input, OnInit } from '@angular/core';
import { faTrash, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../interfaces/product';
import { CartcontainerService } from '../services/cartcontainer.service';
import { ProductscounterService } from '../services/productscounter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-cartitem',
	templateUrl: './cartitem.component.html',
	styleUrls: ['./cartitem.component.css'],
})
export class CartitemComponent implements OnInit {
	trashIcon = faTrash;
	decIcon = faMinusCircle;
	incIcon = faPlusCircle;
	@Input() item: Product = {
		id: 0,
		createdAt: '',
		name: '',
		count: 0,
		price: 0,
		image: '',
		purchaseValue: 0,
	};
	cartArray: any = [];
	itemsCount: number = 0;
	itemsTotalPrice: number = 0;

	constructor(private cartService: CartcontainerService, private counterService: ProductscounterService, private toastr: ToastrService) {}
	ngOnInit(): void {
		this.counterService.counterVal.subscribe((val) => (this.itemsCount = val));
		this.cartService.carttotal.subscribe((val) => (this.itemsTotalPrice = val));
		this.cartService.cartArray.subscribe((arr) => (this.cartArray = arr));
		console.log(this.item);
		console.log(this.item.purchaseValue);
	}

	increaseCounter() {
		if (this.item.purchaseValue === this.item.count) return;
		this.counterService.counterVal.subscribe((val) => (this.itemsCount = val));
		this.counterService.setCounter((this.itemsCount += 1));
		this.item.purchaseValue += 1;
		this.cartService.carttotal.subscribe((val) => (this.itemsTotalPrice = val));
		this.itemsTotalPrice += +this.item.price;
		this.cartService.updateTotalPrice(this.itemsTotalPrice);
	}

	decreaseCounter() {
		this.counterService.counterVal.subscribe((val) => (this.itemsCount = val));
		this.counterService.setCounter((this.itemsCount -= 1));
		this.item.purchaseValue -= 1;
		this.cartService.carttotal.subscribe((val) => (this.itemsTotalPrice = val));
		this.itemsTotalPrice -= +this.item.price;
		this.cartService.updateTotalPrice(this.itemsTotalPrice);
	}

	sendCartUpdate(val: any) {
		this.cartArray = this.cartArray.filter((item: any) => item.id !== this.item.id);
		this.cartService.updateCart(this.cartArray);
		this.itemsTotalPrice -= this.item.price * this.item.purchaseValue;
		this.cartService.updateTotalPrice(this.itemsTotalPrice);
		this.counterService.setCounter(this.itemsCount - val);
	}

	stockToastr() {
		this.toastr.error(`You Parchased The Maximum Available Amout 🛒`, 'Reached Your Limit 💯', {
			timeOut: 2000,
			positionClass: 'toast-top-right',
			progressBar: true,
		});
	}

	limitToastr() {
		this.toastr.warning(`You Can Remove It From Cart 🗑`, 'Only 1 Item Remains 🚫', {
			timeOut: 2000,
			positionClass: 'toast-top-right',
			progressBar: true,
		});
	}
}
