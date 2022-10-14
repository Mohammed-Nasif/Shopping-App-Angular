import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginformComponent } from './loginform/loginform.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductslistComponent } from './productslist/productslist.component';
import { RegisterformComponent } from './registerform/registerform.component';

const routes: Routes = [
	{
		path: '',
		component: ProductslistComponent,
	},
	{
		path: 'home',
		component: ProductslistComponent,
	},
	{
		path: 'cart',
		component: CartComponent,
	},
	{
		path: 'product/:id',
		component: ProductdetailsComponent,
	},
	{
		path: 'register',
		component: RegisterformComponent,
	},
	{
		path: 'login',
		component: LoginformComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
