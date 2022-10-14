import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	isDataFetched = new Subject<boolean>();
	// isDataFetched = new BehaviorSubject(false);

	constructor() {}

	showLoader() {
		console.log('Show Loader');
		this.isDataFetched.next(true);
	}
	hideLoader() {
		console.log('Hide Loader');
		this.isDataFetched.next(false);
	}
}
