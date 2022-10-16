import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-registerform',
	templateUrl: './registerform.component.html',
	styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent implements OnInit {
	registerForm: FormGroup;
	submitted: boolean = false; // Submit Flag To Check User Cliked Register Btn To Show Error Message [But I am Already Disabled The Btn ^_^ Till Validation Done]
	constructor(private fb: FormBuilder, private authService: AuthService) {
		this.registerForm = this.fb.group(
			{
				name: ['', Validators.required],
				emailAdrress: ['', [Validators.required, Validators.email]],
				// --- OR [Use Pattern]---
				// emailAdrress: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/)]],
				username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{3,16}$/)]],
				password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
				confirmPassword: ['', Validators.required],
			},
			{
				validators: this.matchValidator('password', 'confirmPassword'),
			},
		);
	}

	get registerFormControl(): any {
		// Insted Of Typing registerForm.controls["formControlName"] => everyTime
		return this.registerForm.controls;
	}

	ngOnInit(): void {}
	ngDoCheck() {
		const isDirt = this.registerForm.dirty;
		if (isDirt) {
			this.authService.checkRegisteration(false);
		}
	}

	formSubmitHandler() {
		this.submitted = true;
		if (this.registerForm.valid) {
			alert('Check The Submitted Data In Console');
			// Show The Submitted Data In Console
			console.table(this.registerForm.value);
		}
	}

	private matchValidator(control1: string, control2: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const formGroup = control as FormGroup;
			const control1Val = formGroup.get(control1)?.value;
			const control2val = formGroup.get(control2)?.value;
			if (control1Val === control2val) {
				return null;
			} else {
				return { valuesNotMatched: true };
			}
		};
	}
}
