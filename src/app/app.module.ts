import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
// Modules
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
// Services
import { ProductsService } from './services/products.service';
import { ProductscounterService } from './services/productscounter.service';
import { CartcontainerService } from './services/cartcontainer.service';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductslistComponent } from './productslist/productslist.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { CartComponent } from './cart/cart.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartitemComponent } from './cartitem/cartitem.component';
import { NotFoundComponent } from './not-found/not-found.component';
// Interceptors
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { wishListReducer } from './store/wishlist/wishlist.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		ProductslistComponent,
		ProductcardComponent,
		NotFoundComponent,
		CartComponent,
		ProductdetailsComponent,
		CartitemComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 1000,
			progressBar: true,
			preventDuplicates: true,
			closeButton: true,
		}),
		AuthModule,
		SharedModule,
		StoreModule.forRoot({ wishList: wishListReducer }, {}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [
		ProductsService,
		ProductscounterService,
		CartcontainerService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoaderInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
