import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';
@Component({
	selector: 'app-productslist',
	templateUrl: './productslist.component.html',
	styleUrls: ['./productslist.component.css'],
})
export class ProductslistComponent implements OnInit {
	products: any;
	constructor(private service: ProductsService) {}
	ngOnInit(): void {
		this.service
			.getProducts()
			.pipe(
				map((res: any) => {
					const products: any[] = [];
					res.forEach((obj: Product) => {
						products.push(obj);
					});
					return products;
				}),
			)
			.subscribe((data: []) => {
				this.products = data;
				// console.log(this.products);
			});
	}
}
