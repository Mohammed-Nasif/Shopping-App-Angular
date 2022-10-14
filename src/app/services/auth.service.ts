import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private isUserLogged = new BehaviorSubject(false);
	loggedInValue = this.isUserLogged.asObservable();
	constructor() {}

	checkAuthentication(value: boolean) {
		this.isUserLogged.next(value);
	}
}
