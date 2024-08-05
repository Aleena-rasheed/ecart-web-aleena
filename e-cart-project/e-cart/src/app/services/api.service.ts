import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl="http://localhost:3000"

  //searchTerm:string=""
  searchTerm=new BehaviorSubject("")
  //behavior Subject from rxjs library is usded to transfer a stream of data from one component to other

  constructor(private http:HttpClient) { }

  register(user:any){
    return this.http.post(`${this.baseUrl}/user/register`,user)

  }
  login(user:any)
  {
    return this.http.post(`${this.baseUrl}/user/login`,user)
  }

// get all products in the home page

 getAllProducts(){
  return this.http.get(`${this.baseUrl}/all-products`)
 }

 getAProduct(id:any){
  return this.http.get(`${this.baseUrl}/view-product/${id}`)
 }

 appendToken(){
  let headers= new HttpHeaders()
  const token=sessionStorage.getItem("token")
  if(token){
    headers=headers.append("Authorization",`Bearer ${token}`)
  }
  return {headers}
 }

 addToWishlist(product:any){
  return this.http.post(`${this.baseUrl}/wishlist`,product,this.appendToken())
 }

 getWishlist(){
  return this.http.get(`${this.baseUrl}/get-wishlist`,this.appendToken())
 }

 deleteWishlist(id:any){
  return this.http.delete(`${this.baseUrl}/delete-wishlist/${id}`,this.appendToken())
 }

 addToCart(product:any){
  return this.http.post(`${this.baseUrl}/addtocart`,product,this.appendToken())
 }
 getcart(){
  return this.http.get(`${this.baseUrl}/get-cart`,this.appendToken())
 }
 deleteCart(id:any){
  return this.http.delete(`${this.baseUrl}/delete-cart/${id}`,this.appendToken())
 }
 itemIncrement(id:any){
  return this.http.get(`${this.baseUrl}/increment-cart/${id}`,this.appendToken())
 }

 itemDecrement(id:any){
  return this.http.get(`${this.baseUrl}/decrement-cart/${id}`,this.appendToken())

 }
}
