import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { Store } from '@ngrx/store';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { removefromWishlist } from '../store/wishlist/wishlist.action';
import { Router } from '@angular/router';

@Component({
	selector: 'app-wishlist',
	templateUrl: './wishlist.component.html',
	styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
	wishList: any = {};
	removeIcon = faRemove;
	constructor(private store: Store<{ wishList: Array<Product> }>, private router: Router) {
		this.store.select('wishList').subscribe((res) => (this.wishList = res));
	}

	removeFromWishlist(id: number) {
		let clearedProduct = this.wishList.itemsList.filter((item: Product) => item.id === id)[0];
		this.store.dispatch(removefromWishlist({ item: clearedProduct }));
	}
	goToDetails(idNum: number) {
		this.router.navigate(['product', idNum]);
	}
	ngOnInit(): void {}
}
