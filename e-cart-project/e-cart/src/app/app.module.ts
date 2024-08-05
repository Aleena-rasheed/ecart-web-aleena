import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AllproductsComponent,
    RegisterComponent,
    ViewproductComponent,
    PageNotFoundComponent,
    WishlistComponent,
    CartComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
