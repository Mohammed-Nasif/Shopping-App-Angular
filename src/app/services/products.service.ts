import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private url = 'https://60523dc8fb49dc00175b7d04.mockapi.io/api/v1/products';

	constructor(private httpClient: HttpClient) {}

	getProducts(): any {
		return this.httpClient.get(this.url);
	}
	
	getProductdetials(id: number): any {
		return this.httpClient.get(`${this.url}/${id}`);
	}
}
