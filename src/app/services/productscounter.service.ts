import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductscounterService {
	private productscounter = new BehaviorSubject(0);
	counterVal = this.productscounter.asObservable();
	constructor() {}

	getCounter(){
	  return this.counterVal;
	}

	setCounter(value: number) {
		this.productscounter.next(value);
	}
}
