import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any[]=[]
  totalPrice=0;
  showSuccess :boolean=false;
  makePaymentStatus:boolean=false;

  public payPalConfig?: IPayPalConfig;


  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getCart()
    this.getCartTotal() 
    this.initConfig();      
  }

  getCart(){
    this.api.getcart().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.products=res
        this.getCartTotal()
      },
      error:(err:any)=>{
          console.log(err);          
      }     
      
    })
  }


  deleteCart(id:any)
  {
this.api.deleteCart(id).subscribe({
  next:(res:any)=>{
    alert("Product Deleted From Cart")
    this.getCart()
  },
  error:(err:any)=>{
    console.log(err);
    alert("Cannot Delete Product")
    
  }
})
  }

  getCartTotal(){
    let total=0;
    this.products.forEach((item:any)=>{
      total+=item.grandTotal
      this.totalPrice=Math.ceil(total)
      console.log(total);
      console.log(this.totalPrice);
      
      
    })
  }

  itemincrement(id:any){
    this.api.itemIncrement(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCart()   
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  itemdecrement(id:any){
    this.api.itemDecrement(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCart()        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
// paypal functon
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
             value: this.totalPrice.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.totalPrice.toFixed(2)
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.totalPrice.toFixed(2),
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  makePayment()
{
 this.makePaymentStatus=true;
}}
