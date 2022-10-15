import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { LoginformComponent } from './auth/loginform/loginform.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductslistComponent } from './productslist/productslist.component';
import { RegisterformComponent } from './auth/registerform/registerform.component';
import { RegistGuard } from './guards/regist.guard';

const routes: Routes = [
	{
		path: '',
		component: LoginformComponent,
	},
	{
		path: 'login',
		component: LoginformComponent,
	},
	{
		path: 'home',
		component: ProductslistComponent,
		canActivate: [AuthGuard],
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
		canDeactivate: [RegistGuard],
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
