import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  product:any={}
  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit(): void {
    this.viewProduct()
  }
  viewProduct() {
    //to get productid
    this.route.params.subscribe((res: any) => {
      console.log(res);
      const { id } = res
      console.log(id);

      this.api.getAProduct(id).subscribe((res: any) => {
        console.log(res);
        this.product=res      
        
      })      
    
  })
}

addToWishlist(){
  if(sessionStorage.getItem('token')){
    console.log(sessionStorage.getItem('token'));
    
    this.api.addToWishlist(this.product).subscribe({
      next:(res:any)=>{
        alert("Product added to Wishist")
      },
      error:(err:any)=>{
        console.log("already added to wishlist :",err);
        
        alert("Already Added to Wishlist")
      }
    })
  }
  else{
    alert("Please Login ")
  }
}

addToCart(product:any){
  Object.assign(product,{quantity:1})
  console.log(product);
  
  if(sessionStorage.getItem('token')){
    console.log(sessionStorage.getItem('token'));
    
    this.api.addToCart(product).subscribe({
      next:(res:any)=>{
        console.log(res);        
        alert("Product added to Cart")
      },
      error:(err:any)=>{
        alert("Already Added to Cart")
      }
    })
  }
  else{
    alert("Please Login ")
  }

}

}