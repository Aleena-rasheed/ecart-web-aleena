import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private api: ApiService) { }
  wishlistArray: any = [];
  ngOnInit(): void {
    this.getWishlistProduct()
  }
  getWishlistProduct() {
    this.api.getWishlist().subscribe({
      next: (res: any) => {
        console.log(res);
        this.wishlistArray = res
        console.log(this.wishlistArray);
        

      },
      error: (err: any) => {
        console.log("error fetching data", err);

      }
    })
  }

  deleteWishlistProduct(id:any){
    this.api.deleteWishlist(id).subscribe({
      next:(res:any)=>{
        alert("Product Deleted Successfully")
        this.getWishlistProduct()
      },
      error:(err:any)=>{
        alert("Error : Cannot Delete")
      }
    })

  }

}
