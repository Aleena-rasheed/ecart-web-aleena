import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
  allProducts:any[]=[]
  searchKey:string=""

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getProducts()
    //passing value from apiServices to this component
    // this.searchKey=this.api.searchTerm
    this.api.searchTerm.subscribe((data:any)=>{
      this.searchKey=data
      console.log(this.searchKey);
      
    }     
    )
  }
  getProducts() {
    this.api.getAllProducts().subscribe(
      (products: any) => {
        console.log(products);
        this.allProducts=products;
      }
    )


  }
}




