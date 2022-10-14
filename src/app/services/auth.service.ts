import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private isUserLogged = new BehaviorSubject(false);
	loggedInValue = this.isUserLogged.asObservable();
	private isStartRegist = new BehaviorSubject(true);
	registValue = this.isStartRegist.asObservable();
	constructor() {}

	checkAuthentication(value: boolean) {
		this.isUserLogged.next(value);
	}

	checkRegisteration(value: boolean) {
		this.isStartRegist.next(value);
	}
}
