import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
	selector: 'app-productslist',
	templateUrl: './productslist.component.html',
	styleUrls: ['./productslist.component.css'],
})
export class ProductslistComponent implements OnInit {
	products: any;
	constructor(private service: ProductsService) {}
	ngOnInit(): void {
		this.service.getProducts().subscribe((response: any) => {
			this.products = response;
			// console.log(this.products);
		});
	}
}
