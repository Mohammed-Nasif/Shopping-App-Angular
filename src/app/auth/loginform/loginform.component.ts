import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-loginform',
	templateUrl: './loginform.component.html',
	styleUrls: ['./loginform.component.css'],
})
export class LoginformComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) {}
	ngOnInit(): void {}
	formSubmitHandler(form: any) {
		this.authService.checkAuthentication(true); // User Authentication Guard
		this.router.navigate(['home']);
	}
}
