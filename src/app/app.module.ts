import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductslistComponent } from './productslist/productslist.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './services/products.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterformComponent } from './registerform/registerform.component';
import { LoginformComponent } from './loginform/loginform.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductscounterService } from './services/productscounter.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartitemComponent } from './cartitem/cartitem.component';
import { CartcontainerService } from './services/cartcontainer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
registerLocaleData(localeFr, 'fr');
@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		ProductslistComponent,
		ProductcardComponent,
		RegisterformComponent,
		LoginformComponent,
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
	],
	providers: [ProductsService, ProductscounterService, CartcontainerService],
	bootstrap: [AppComponent],
})
export class AppModule {}
