import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

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
	};
	isLoading = false;
	constructor(private route: ActivatedRoute, private detailsService: ProductsService) {
		const params = this.route.snapshot.params;
		this.product.id = params['id'];
		this.getProductDetails(this.product.id);
	}
	ngOnInit() {
		this.isLoading = true;
		setTimeout(() => (this.isLoading = false), 500);
	}
	getProductDetails(ID: any): void {
		this.detailsService.getProductdetials(ID).subscribe((response: any) => {
			this.product = response;
			console.log(this.product);
		});
	}
}
