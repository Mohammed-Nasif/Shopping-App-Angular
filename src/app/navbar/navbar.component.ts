import { Component, OnInit } from '@angular/core';
import { ProductscounterService } from '../services/productscounter.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	productsCount: number = 0;
	constructor(private counterService: ProductscounterService) {}
	ngOnInit(): void {
		this.counterService.counterVal.subscribe((val) => (this.productsCount = val));
	}
}
