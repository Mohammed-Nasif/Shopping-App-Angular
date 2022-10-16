import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { Store } from '@ngrx/store';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { removefromWishlist } from '../store/wishlist/wishlist.action';
import { Router } from '@angular/router';

@Component({
	selector: 'app-productslist',
	templateUrl: './productslist.component.html',
	styleUrls: ['./productslist.component.css'],
})
export class ProductslistComponent implements OnInit {
	products: any;
	wishList: any = {};
	removeIcon = faRemove;
	constructor(private service: ProductsService, private store: Store<{ wishList: Array<Product> }>, private router: Router) {
		// Get The Value From Store
		this.store.select('wishList').subscribe((res) => (this.wishList = res));
	}
	ngOnInit(): void {
		this.service.getProducts().subscribe((data: []) => {
			this.products = data;
		});
	}
	removeFromWishlist(id: number) {
		let clearedProduct = this.wishList.itemsList.filter((item: Product) => item.id === id)[0];
		this.store.dispatch(removefromWishlist({ item: clearedProduct }));
	}
	goToDetails(idNum: number) {
		//Navigate To Product Details Page And With Product Id
		this.router.navigate(['product', idNum]);
	}
}
