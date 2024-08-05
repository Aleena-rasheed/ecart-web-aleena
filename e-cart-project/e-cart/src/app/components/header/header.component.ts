import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private api:ApiService){}
search(event:any){
  console.log(event.target.value);
  //give this value to search term in apiServices
  this.api.searchTerm.next(event.target.value);
  //.next is used to transfer stram of data to other component when using behaviorsubject
  

}
}
