import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class RegistGuard implements CanDeactivate<unknown> {
	isUserNavigate: boolean = false; // If User Navigate ? "True" = Leave Route , "Fasle" = Try To Leave Route
	userChoice: boolean = true; // User Choice Set To Be True By Default As Form Is Not Dirty
	constructor(private authService: AuthService) {
		this.authService.registValue.subscribe((val) => (this.isUserNavigate = val));
	}
	canDeactivate(
		component: unknown,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.isUserNavigate) {
			this.userChoice = confirm('Do you want discard your changes ?');
			if (this.userChoice) {
				this.authService.checkRegisteration(this.userChoice);
			}
		}
		return this.userChoice;
	}
}
