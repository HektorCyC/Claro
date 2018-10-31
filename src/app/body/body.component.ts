import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent  {

  public cartCount:number = 5;
  @Output() public cartCountEvent = new EventEmitter();

  onCartAdd(event){
    this.cartCountEvent.emit(this.cartCount);
    console.log(this.cartCountEvent.emit('Perritos'))
  }
  constructor(public auth: AuthService){}
 /*
    sendCount (){
      var update = this.cartCountEvent.emit(this.cartCount);
      console.log(update)
    }*/
}