import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
	declarations: [LoginformComponent, RegisterformComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
	exports: [LoginformComponent, RegisterformComponent],
})
export class AuthModule {}
