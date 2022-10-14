import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
	// isLoading: Subject<boolean> = this.loaderService.isDataFetched;
	isLoading: boolean = false;

	constructor(private loaderService: LoaderService) {
		this.loaderService.isDataFetched.subscribe((val) => (this.isLoading = val));
		// console.log(this.isLoading);
		// console.log('Loading');
	}
}
