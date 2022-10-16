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
	
	constructor(private service: ProductsService) {
	}
	ngOnInit(): void {
		this.service.getProducts().subscribe((data: []) => {
			this.products = data;
		});
	}

}
