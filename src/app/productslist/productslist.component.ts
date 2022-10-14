import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
	selector: 'app-productslist',
	templateUrl: './productslist.component.html',
	styleUrls: ['./productslist.component.css'],
})
export class ProductslistComponent implements OnInit {
	products: any;
	isLoading = false;

	constructor(private service: ProductsService) {}

	ngOnInit(): void {
		this.service.getProducts().subscribe((response: any) => {
			this.products = response;
			// console.log(this.products);
		});
		this.isLoading = true;
		setTimeout(() => (this.isLoading = false), 300);
	}
}