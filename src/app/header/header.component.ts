import { Component, OnInit, Input} from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Input() public cartData;
  constructor(public auth: AuthService) { }
  
  ngOnInit(){

  }
  /* 
  receiveUpdateCart($event){
    this.cartCount = $event;

  }*/

}
