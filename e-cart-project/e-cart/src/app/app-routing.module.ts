import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', component:AllproductsComponent },
  {path:'user/login', component:LoginComponent },
  {path:'user/register', component:RegisterComponent },
  {path:'user/wishlist', component:WishlistComponent },
  {path:'user/cart', component:CartComponent },
  {path:'view/:id', component:ViewproductComponent},
  {path:'**', component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
